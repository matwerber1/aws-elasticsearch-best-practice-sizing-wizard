import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { store, view } from 'react-easy-state';
import Link from '@material-ui/core/Link';

// Global constants / settings for a workload
const WORKLOAD = {
  INDEX_TYPE: {
    SINGLE: 'singleIndex',
    MULTI: 'multiIndex'
  }, 
  STORAGE: {
    RECOMMENDED_BUFFER: 1.15,
    RECOMMENDED_BUFFER_PERCENT: 15,
    INFLATION_FACTOR: 1.1,
    MIN_GB_PER_NODE: 3,
    MAX_GB_PER_NODE: 50
  },
};

// Global state store w/ react-easy-state:
const state = store({
  indexType: WORKLOAD.INDEX_TYPE.SINGLE,
  indexSize: 100,
  indexCount: 1.0,
  replicationFactor: 2, 
  clusterStorageGb: 0,
  storageGbPerIndex: 0, 
  storageGbPerShard: 30,
  primaryShardCount: 0
});



const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

// Helper function that updates state based on the modified field's key. Note
// that most input fields work fine and pass in an "event" object with a
// target.name and target.value, but certain components like the material-ui
// Slider do not, and we need a slightly different approach (we use a separate
// function in these cases:
function handleStateChange(event) {
  state[event.target.name] = event.target.value;
}

//------------------------------------------------------------------------------
// ElasticSearchWizard
//   Main component to render our advice-giving wizard
//------------------------------------------------------------------------------
const ElasticsearchWizard = view(() => {
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc' }} >
        <h1>Amazon Elasticsearch Size Wizard</h1>
        No surefire method of sizing Amazon ES domains exists, but by starting with an understanding of your storage needs, the service, and Elasticsearch itself, you can make an educated initial estimate on your hardware needs. This estimate can serve as a useful starting point for the most critical aspect of sizing domains: testing them with representative workloads and monitoring their performance.
        <br/><br/>
        <a href="https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/sizing-domains.html">Click here</a> for additional info. 
        </Typography>
      </Container>
      <br /><br />
      <b>Note!</b> - This is a work in process. Also, <b>I am fairly new to Elasticsearch</b> (at the time of this writing), so please fact-check any advice you receive here.<br/><br/>
      <Container maxWidth="md">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc' }} >
          <StorageCalculator/>
        </Typography>
      </Container>
      <br/><br/>
      <Container maxWidth="md">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc' }} >
          <ShardCalculator/>
        </Typography>
      </Container>
      <br/><br/>
      <Container maxWidth="md">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc' }} >
          <ComputeCalculator/>
        </Typography>
      </Container>
    </React.Fragment>
  );
});

//------------------------------------------------------------------------------
// ShardCalculator
//   This allows the user to enter information about their workload and receive
//   a recommendation on the number of shards to use: 
//------------------------------------------------------------------------------
const ShardCalculator = view(() => {

  return (
    <React.Fragment>
      <table className="MyTable">
        <tbody>
          <tr><td colSpan="2"><h1>Shard Count Calculator</h1></td></tr>
         
          <tr>
            <td>
              <b>Total storage requirement </b>(per above):
            </td>
            <td>
              {getClusterStorage()}
            </td>
          </tr>
         
          <tr>
            <td>
              <b>Number of indexes:</b>
            </td>
            <td>
              {state.indexCount} index{state.indexCount > 1 ? 'es' : ''}
            </td>
          </tr>
         
          <tr>
            <td>
              <b>Storage per Index:</b>
            </td>
            <td>
              {updateStoragePerIndex()} GB per index
            </td>
          </tr>

          <tr>
            <td>
              <b>Recommended storage per shard:</b>
            </td>
            <td>
              10 to 50 GB per shard.<br />
              30 GB per shard is a good rule of thumb that we will use below.
            </td>
          </tr>
          
          <tr>
            <td>
              <b>GB per shard for our calculation:</b>
            </td>
            <td>
              {state.storageGbPerShard} GB
            </td>
          </tr>
          
          <tr>
            <td>
              <b>Recommended number of primary shards</b>: 
            </td>
            <td>
              <b>{updatePrimaryShardCount()} primary shards</b> (rounded up)
            </td>
          </tr>
          
          <tr>
            <td>

            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>

            </td>
            <td>
              
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
});

const storagePerShardSliderMarks = [
  {
    value: 3,
    label: '3 GB',
  },
  {
    value: 50,
    label: '50 GB',
  },
];

function storagePerShardSliderText(value) {
  return `${value} GB`;
}


//------------------------------------------------------------------------------
// ComputeCalculator
//   This allows the user to enter information about their workload and receive
//   a recommendation on their compute (vCPU and RAM) needs:
//------------------------------------------------------------------------------
const ComputeCalculator = view(() => {

  // Ratio of CPU to shard should be < 1. Each shard requires a CPU, but we also
  // need CPU for administrative / background cluster tasks.
  // https://youtu.be/95kQkS51VnU?t=1157

  // Total shards should be less than 25 / GB of JVM.
  // https://youtu.be/95kQkS51VnU?t=1196

  // Less than 1000 shards = typically ok 
  // < 10,000 = yellow area
  // 20,000+ shards = typically problematic
  // https://youtu.be/95kQkS51VnU?t=1204

  // Max of 50 GB of data per shard: 
  // https://youtu.be/95kQkS51VnU?t=1291
  
  // At least a few GBs to "10s of GBs", so let's say >= 3GB but, again, less
  // than 50 GB:
  // https://www.elastic.co/blog/how-many-shards-should-i-have-in-my-elasticsearch-cluster

  return (
    <React.Fragment>
      <table className="MyTable">
        <tbody>
          <tr><td colSpan="2"><h1>Compute Calculator</h1></td></tr>
          <tr>
            <td>
              
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>

            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <b>Tips and tricks: </b>
              <ul>
                <li><a href="https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-bp.html">Use three dedicated master nodes spread across three AZs</a></li>
                <li><a href="https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-managedomains-dedicatedmasternodes.html">AWS master node sizing recommendations</a></li>
                <li><a href="https://www.bluematador.com/docs/troubleshooting/aws-elasticsearch-jvm-pressure">Nodes allocate 50% of memory to ES JVM, up to 32 GB.</a> Even though nodes with > 64 GB do not increase the JVM Heap, that extra memory can still help related OS tasks and ultimately boost performance. As always, it depends. </li> 
                <li><a href="https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/sizing-domains.html#aes-bp-instances">Low workloads or shard counts, start with 2 vCPUs & 8 GB RAM per 512 GB of storage per node.</a></li>
                <li><a href="https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/sizing-domains.html#aes-bp-instances">High workloads or shard counts, start with 2 vCPUs & 8 GB RAM per 100 GB of storage per node.</a></li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );

});




//------------------------------------------------------------------------------
// StorageCalculator
//   This allows the user to enter information about their indexes and then
//   provides the user with a recommended cluster storage size in GB.
//------------------------------------------------------------------------------
const StorageCalculator = view(() => {
  return (
    <React.Fragment>
      <table className="MyTable">
        <tbody>
          <tr><td colSpan="2"><h1>Storage Calculator</h1></td></tr>
          <IndexTypeSelect />
          <IndexCountTextField />
          <DataSizeTextField />
          <ReplicationFactorTextField />
          <StorageRecommendation />
          <StorageTipsAndTricks />
        </tbody>
      </table>
    </React.Fragment>
  );
});


//------------------------------------------------------------------------------
// IndexTypeSelect
//   Allow the user to select between a single index and a partitioned index. 
//   A common partitioned index would be to have one index per day for logs, 
//   keeping up to X number of days. A "single index" means just that - a single
//   index that we update as needed, such as an item catalog. 
//------------------------------------------------------------------------------
const IndexTypeSelect = view(() => {

  const classes = useStyles();

  return (
    <React.Fragment>
      <tr>
        <td width="40%">
          <b>Will you use a single index, or partition it?</b><br /><br />
          Typically, we see partioning with streaming use cases, such as log analytics, where you keep X number of days of data, each day gets its own index, and searches are more likely to occur on recent data.
          <br/><br/>
          In contrast, a single index might be something like a product catalog, where searches could be at any point in the index. 
        </td>
        <td>
          <FormControl className={classes.formControl} variant="filled">
            <Select
              name="indexType"
              value={state.indexType}
              onChange={handleStateChange}
            >
              <MenuItem value={WORKLOAD.INDEX_TYPE.MULTI}>Partitioned index</MenuItem>
              <MenuItem value={WORKLOAD.INDEX_TYPE.SINGLE}>Single index</MenuItem>
            </Select>
          </FormControl>
        </td>
      </tr>
    </React.Fragment>
  );
});


//------------------------------------------------------------------------------
// DataSizeTextField
//   Allows the user to tell us how much data is stored per index. In a single
//   index use case, this is the entire data set (e.g. 10 GB of product data), 
//   and in a partitioned index use case, this means how much data per index...
//   for example, if we have one index per day of logs, and each day's logs are
//   about 10 GB, we would use a value of 10. 
//------------------------------------------------------------------------------
const DataSizeTextField = view(() => {
  var prompt;
  if (state.indexType === WORKLOAD.INDEX_TYPE.SINGLE) {
    prompt = 'How much data will your index hold?';
  }
  else {
    prompt = 'How much data will each index hold?';
  }
  return (
    <React.Fragment>
      <tr>
        <td>
          <b>{prompt}</b>
        </td>
        <td>
          <TextField
            defaultValue={state.indexSize}
            label="data size in GB?"
            name="indexSize"
            onChange={handleStateChange} 
            variant="filled"
            />
        </td>
      </tr>
    </React.Fragment>
  )
});


//------------------------------------------------------------------------------
// IndexCountTextField
//   Allows user to specify how many partitions will be kept in the cluster for
//   a partitioned index (not applicable to single index). For example, if the
//   customer has 10 GB of log data per day and wants to keep 30 days of log data
//   in their cluster, they would have one index per day and the value of this
//   field would be 30. 
//------------------------------------------------------------------------------
const IndexCountTextField = view(() => {
    
  if (state.indexType === WORKLOAD.INDEX_TYPE.MULTI) {
    return (
      <React.Fragment>
        <tr>
          <td>
            <b>How many index partitions will you keep?</b>
          </td>
          <td>
            <TextField
              defaultValue={state.indexCount}
              label="Number of partitions?"
              name="indexCount"
              onChange={handleStateChange} 
              variant="filled"
            />
          </td>
        </tr>
      </React.Fragment>
    )
  }
  else {
    state.indexCount = 1;
    return;
  }
});


//------------------------------------------------------------------------------
// getClusterStorage
//   Based on all of the user's input data, this function calculates a best
//   practices / rule of thumb storage requirement in GB for their ES cluster. 
//   Actual requirements may vary. It updates the state and also returns the
//   the new value to the function caller.
//------------------------------------------------------------------------------
const getClusterStorage = () => {

  state.clusterStorageGb =
    state.indexSize
    * state.replicationFactor
    * state.indexCount
    * WORKLOAD.STORAGE.RECOMMENDED_BUFFER
    * WORKLOAD.STORAGE.INFLATION_FACTOR
    ;
  
    if (state.clusterStorageGb < 1000) {
      return state.clusterStorageGb.toLocaleString(undefined, { maximumFractionDigits: 0 }) + " GB";
    }
    else if (state.clusterStorageGb < 1000000) {
      // Round up to nearest 100 GB:
      return ((state.clusterStorageGb + 100) / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 }) + " TB";
    }
    else {
      // Round up to nearest 1 TB:
      return ((state.clusterStorageGb + 1000) / 1000000).toLocaleString(undefined, { maximumFractionDigits: 3 }) + " PB";
    }      
};


//------------------------------------------------------------------------------
// updateStoragePerIndex
//------------------------------------------------------------------------------
const updateStoragePerIndex = () => {
  state.storageGbPerIndex =  state.clusterStorageGb / state.indexCount;
  return state.storageGbPerIndex.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

//------------------------------------------------------------------------------
// round
//   Numbers need to be rounded, yo. 
//------------------------------------------------------------------------------
function round(n, precision) {
  if (precision < 0) {
    const length = String(n).split('.')[0].length;
    return parseFloat(n.toLocaleString('en', { maximumSignificantDigits: length + precision, useGrouping: false }));
  }
  return parseFloat(n.toLocaleString('en', { maximumFractionDigits: precision, useGrouping: false }));
}

//------------------------------------------------------------------------------
// updatePrimaryShardCount
//   Based on all of the user's input data, this function calculates a best
//   practices / rule of thumb number of primary shards recommended for the
//   cluster (based on the rule of thumb of between 3 to 50 GB storage per shard).
//------------------------------------------------------------------------------
const updatePrimaryShardCount = () => {
  // We add 0.5 to effectively round up:
  state.primaryShardCount = (parseFloat(state.storageGbPerIndex)/ parseFloat(state.storageGbPerShard)) + 0.5;
  return state.primaryShardCount.toLocaleString(undefined, {maximumFractionDigits: 0});
}

//------------------------------------------------------------------------------
// ReplicationFactorTextField
//   Allows the user to specify their replication factor. A value of 1 indicates
//   only primary shards with no replica, a value of 2 means one primary and
//   one replica, so on and so forth. For production, we recommend at least a
//   replication of factor of 2 so that a node failure does not lead to data loss.
//------------------------------------------------------------------------------
const ReplicationFactorTextField = view(() => {
  return (
    <React.Fragment>
      <tr>
        <td>
          <b>What is your replication factor?</b><br />
        </td>
        <td>
          <TextField
            defaultValue={state.replicationFactor}
            label="replication factor?"
            name="replicationFactor"
            onChange={handleStateChange} 
            variant="filled"
          />
          <br /><br/>
          <li>Best practice - <a href="https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-bp.html">at least 1 replica</a> (replication factor = 2)</li>
        </td>
      </tr>
    </React.Fragment>
  );
});


//------------------------------------------------------------------------------
// StorageRecommendation
//   This component renders a box to display recommended storage to the user
//   based on their form input. 
//------------------------------------------------------------------------------
const StorageRecommendation = view(() => {

  function PetabyteDisclaimer() {
    return (
      <React.Fragment>
        <br/><br/>
        <b>Important!</b> - As your storage requirements are >= 1 PB, you should instead follow the recommendations <a href="https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/petabyte-scale.html">in this guide</a>.
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <tr>
        <td>
          <b>Recommended storage:</b><br/>
          <a href="https://youtu.be/95kQkS51VnU?t=589" >Based on this guidance</a>
          <br /><br />
          Note that <a href="https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/sizing-domains.html">these AWS docs</a> call for a slightly different formula, but the results are more or less the same. 
        </td>
        <td>
          = {state.indexSize} GB storage * {WORKLOAD.STORAGE.INFLATION_FACTOR} inflation factor * {state.replicationFactor} replication factor  * {state.indexCount} index partitions * {WORKLOAD.STORAGE.RECOMMENDED_BUFFER} buffer factor
          <br/>
          = <b>{getClusterStorage()}</b> recommended cluster storage.
          {state.clusterStorageGb > 1000000 ? <PetabyteDisclaimer /> : ""}
        </td>
      </tr>
    </React.Fragment>
  );
});


//------------------------------------------------------------------------------
// StorageTipsAndTricks
//   Provides users with links to further best practices. 
//------------------------------------------------------------------------------
const StorageTipsAndTricks = view(() => {

  return (
    <React.Fragment>
      <tr>
        <td colSpan="2">
          <b>Storage tips and tricks: </b><br />
          <br />
          <ul>
            <li><a href="https://youtu.be/95kQkS51VnU?t=650">Reducing source data has the greatest impact on storage needs</a></li>
              <ul>
                <li>for example, <a href="https://youtu.be/95kQkS51VnU?t=730">removing @message</a> has a huge impact</li>
              </ul>
            <li><a href="https://youtu.be/95kQkS51VnU?t=817">Disable uneeded mapping features</a></li>
          </ul>
        </td>
      </tr>
    </React.Fragment>
  );
});


//------------------------------------------------------------------------------
// App
//   Main entry point into our application.
//------------------------------------------------------------------------------
const App = view(() => {
  return (
    <div className="App">
      <header>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </header>
      <ElasticsearchWizard />
      <br />
      <br />
      <br />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
});

export default App;
