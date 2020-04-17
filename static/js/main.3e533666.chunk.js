(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{55:function(e,t,a){e.exports=a(67)},60:function(e,t,a){},61:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},62:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(6),o=a.n(r),c=(a(60),a(61),a(62),a(101)),m=a(104),i=a(102),s=a(42),u=a(109),d=a(107),E=a(108),h=a(110),b=a(11),p={SINGLE:"singleIndex",MULTI:"multiIndex"},g={RECOMMENDED_BUFFER:1.15,RECOMMENDED_BUFFER_PERCENT:15,INFLATION_FACTOR:1.1,MIN_GB_PER_NODE:3,MAX_GB_PER_NODE:50},f=Object(b.a)({indexType:p.SINGLE,indexSize:100,indexCount:1,replicationFactor:2,clusterStorageGb:0,storageGbPerIndex:0,storageGbPerShard:30,primaryShardCount:0,dataNodeCount:3,recommendedDataNodeCounts:[]}),y={indexType:p.SINGLE,indexSize:0,indexCount:0,replicationFactor:0,clusterStorageGb:0,storageGbPerIndex:0,storageGbPerShard:0,primaryShardCount:0,dataNodeCount:0},v=Object(s.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)},root:{"& > *":{margin:e.spacing(1),width:200}}}}));function w(e){""===e.target.value&&(console.log("Empty value for ".concat(e.target.name,", replacing with ").concat(y[e.target.name])),f[e.target.name]=y[e.target.name]),isNaN(e.target.value)?console.log("".concat(e.target.value," is not a valid number for ").concat(e.target.name,", ignoring change!")):f[e.target.name]=e.target.value}var S=function(){f.recommendedDataNodeCounts=function(e){if(e<1)throw"Argument error";for(var t=[],a=[],n=Math.floor(Math.sqrt(e)),l=1;l<=n;l++)e%l==0&&(t.push(l),l*l!=e&&a.push(e/l));return a.reverse(),t.concat(a)}(f.primaryShardCount).join(", ")},C=Object(b.b)((function(){return f.primaryShardCount=(parseFloat(f.storageGbPerIndex)/parseFloat(f.storageGbPerShard)+.5).toLocaleString(void 0,{maximumFractionDigits:0}),S(),l.a.createElement(l.a.Fragment,null,l.a.createElement(c.a,null),l.a.createElement(i.a,{maxWidth:"md"},l.a.createElement(m.a,{component:"div",style:{backgroundColor:"#cfe8fc"}},l.a.createElement("h1",null,"Amazon Elasticsearch Size Wizard"),"No surefire method of sizing Amazon ES domains exists, but by starting with an understanding of your storage needs, the service, and Elasticsearch itself, you can make an educated initial estimate on your hardware needs. This estimate can serve as a useful starting point for the most critical aspect of sizing domains: testing them with representative workloads and monitoring their performance.",l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("a",{href:"https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/sizing-domains.html"},"Click here")," for additional info.")),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("b",null,"Note!")," - This is a work in process. Also, ",l.a.createElement("b",null,"I am fairly new to Elasticsearch")," (at the time of this writing), so please fact-check any advice you receive here.",l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement(i.a,{maxWidth:"md"},l.a.createElement(m.a,{component:"div",style:{backgroundColor:"#cfe8fc"}},l.a.createElement(G,null))),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement(i.a,{maxWidth:"md"},l.a.createElement(m.a,{component:"div",style:{backgroundColor:"#cfe8fc"}},l.a.createElement(N,null))),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement(i.a,{maxWidth:"md"},l.a.createElement(m.a,{component:"div",style:{backgroundColor:"#cfe8fc"}},l.a.createElement(k,null))),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement(i.a,{maxWidth:"md"},l.a.createElement(m.a,{component:"div",style:{backgroundColor:"#cfe8fc"}},l.a.createElement(x,null))))})),x=Object(b.b)((function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("table",{className:"MyTable"},l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",{colSpan:"2"},l.a.createElement("h1",null,"Storage Volume Advisor"))),l.a.createElement("tr",null,l.a.createElement("td",{width:"40%"},l.a.createElement("b",null,"Do you need provisioned IOPS (PIOPS) on an EBS volume?")),l.a.createElement("td",null,"Generally, no. ES is not typically IO-intensive. EBS' general purpose SSD ",l.a.createElement("a",{href:"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html"},"GP2 volume type")," gives you 3 IOPS for every 1 GB in storage volume size, up to 3,000 IOPS in total. Often, we find this is enough, and in many cases its more cost-effective to oversize your EBS volume to get extra IOPS than it is to pay for provisioned IOPS.",l.a.createElement("br",null),l.a.createElement("a",{href:"https://youtu.be/95kQkS51VnU?t=1422"},"Click here for reference."))),l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"Should you use EBS volumes or instance-store (locally attached) volumes, such as the ",l.a.createElement("a",{href:"https://aws.amazon.com/ec2/instance-types/i3/"}),"EC2 I3",l.a.createElement("a",null)," instance:")),l.a.createElement("td",null,"Rather than network-attached EBS volumes, you could optionally use an EC2 instance that have ",l.a.createElement("a",{href:"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html"},"NVMe-attached instance storage"),", which is a high-performance storage volume physically on the same host. I3's can deliver significantly more IOPS (",l.a.createElement("a",{href:"https://aws.amazon.com/about-aws/whats-new/2017/02/now-available-amazon-ec2-i3-instances-next-generation-storage-optimized-high-i-o-instances/"},"e.g. up to 3.3M random IOPS at 4KB block size"),") without any additional storage cost above the price of the EC2 instance itself.",l.a.createElement("br",null),l.a.createElement("br",null),"So, should you use an EC2 with instance storeage or an EBS volume? It depends - for smaller use cases (",l.a.createElement("a",{href:"https://youtu.be/95kQkS51VnU"},"ballpark, under 5 TB"),"), EC2 with EBS will work and is more cost-effective than instance storage. As your use case grows, there is an inflection point where the I3 storage will be lower-cost.",l.a.createElement("br",null),l.a.createElement("br",null),"Of course, you may have high performance requirements where, regardless of data size, I3's are needed to meet your throughput requirements and are the better option than EBS.",l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("a",{href:"https://youtu.be/95kQkS51VnU?t=1317"},"Click here for reference.")," Note - this reference material refers to I3 vs. R4 and M4 EC2s. Today, we have fifth generation (M5, R5) instances that are higher performance at a lower cost than the old gen-4 instances... so, the breakeven / cost numbers have changed a bit.")))))})),N=Object(b.b)((function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("table",{className:"MyTable"},l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",{colSpan:"2"},l.a.createElement("h1",null,"Shard Count Calculator"))),l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"Total storage requirement "),"(per above):"),l.a.createElement("td",null,O())),l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"Number of indexes:")),l.a.createElement("td",null,f.indexCount," index",f.indexCount>1?"es":"")),l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"Storage per Index:")),l.a.createElement("td",null,z()," GB per index")),l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"Recommended storage per shard:")),l.a.createElement("td",null,"10 to 50 GB per shard.",l.a.createElement("br",null),"30 GB per shard is a good rule of thumb that we will use below.")),l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"GB per shard for our calculation:")),l.a.createElement("td",null,f.storageGbPerShard," GB")),l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"Recommended number of primary shards"),":"),l.a.createElement("td",null,l.a.createElement("b",null,f.primaryShardCount," primary shards")," (rounded up)")),l.a.createElement("tr",null,l.a.createElement("td",null),l.a.createElement("td",null)),l.a.createElement("tr",null,l.a.createElement("td",null),l.a.createElement("td",null)))))}));var k=Object(b.b)((function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("table",{className:"MyTable"},l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",{width:"40%",colSpan:"2"},l.a.createElement("h1",null,"Compute Calculator"))),l.a.createElement("tr",null,l.a.createElement("td",{colSpan:"2"},l.a.createElement("h2",null,"Master nodes"))),l.a.createElement("tr",null,l.a.createElement("td",{colSpan:"2"},l.a.createElement("h2",null,"Data nodes"))),l.a.createElement("tr",null,l.a.createElement("td",null,"Based on your recommended ",l.a.createElement("b",null,f.primaryShardCount," primary shards")," (above), any of the following number of data nodes would give you even shard distribution across your cluster:"),l.a.createElement("td",null,f.recommendedDataNodeCounts)),l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"How many EC2 data nodes do you want?"),l.a.createElement("br",null),l.a.createElement("br",null),"Fewer nodes are more performant, but we recommend at least two for production to avoid data loss in event of a node failure."),l.a.createElement("td",null,l.a.createElement(h.a,{value:f.dataNodeCount,label:"Number of data nodes?",name:"dataNodeCount",onChange:w,variant:"filled"}),l.a.createElement("br",null),f.recommendedDataNodeCounts.includes(f.dataNodeCount)?"":l.a.createElement("p",null,"Warning! ","".concat(f.primaryShardCount," primary shards cannot be evenly distributed across ").concat(f.dataNodeCount," data node(s), which is less than ideal. While it will work, it might lead to hot nodes.")),f.dataNodeCount<2?l.a.createElement("p",null,"Warning! At least 2 nodes are recommended for production use cases to avoid data loss in the event of node failure."):"",f.dataNodeCount>f.primaryShardCount?l.a.createElement("p",null,'"Warning! having more nodes than primary shards means that you will have underutilized nodes. We recommend having as many or fewer nodes than primary shards." '):"")),l.a.createElement("tr",null,l.a.createElement("td",null),l.a.createElement("td",null)),"          ",l.a.createElement("tr",null,l.a.createElement("td",null),l.a.createElement("td",null)),l.a.createElement("tr",null,l.a.createElement("td",null),l.a.createElement("td",null)),l.a.createElement("tr",null,l.a.createElement("td",{colSpan:"2"},l.a.createElement("b",null,"Tips and tricks: "),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("a",{href:"https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-bp.html"},"Use three dedicated master nodes spread across three AZs")),l.a.createElement("li",null,l.a.createElement("a",{href:"https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-managedomains-dedicatedmasternodes.html"},"AWS master node sizing recommendations")),l.a.createElement("li",null,l.a.createElement("a",{href:"https://www.bluematador.com/docs/troubleshooting/aws-elasticsearch-jvm-pressure"},"Nodes allocate 50% of memory to ES JVM, up to 32 GB.")," Even though nodes with > 64 GB do not increase the JVM Heap, that extra memory can still help related OS tasks and ultimately boost performance. As always, it depends. "),l.a.createElement("li",null,l.a.createElement("a",{href:"https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/sizing-domains.html#aes-bp-instances"},"Low workloads or shard counts, start with 2 vCPUs & 8 GB RAM per 512 GB of storage per node.")),l.a.createElement("li",null,l.a.createElement("a",{href:"https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/sizing-domains.html#aes-bp-instances"},"High workloads or shard counts, start with 2 vCPUs & 8 GB RAM per 100 GB of storage per node."))))))))})),G=Object(b.b)((function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("table",{className:"MyTable"},l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",{colSpan:"2"},l.a.createElement("h1",null,"Storage Calculator"))),l.a.createElement(I,null),l.a.createElement(B,null),l.a.createElement(F,null),l.a.createElement(T,null),l.a.createElement(M,null),l.a.createElement(P,null))))})),I=Object(b.b)((function(){var e=v();return l.a.createElement(l.a.Fragment,null,l.a.createElement("tr",null,l.a.createElement("td",{width:"40%"},l.a.createElement("b",null,"Will you use a single index, or partition it?"),l.a.createElement("br",null),l.a.createElement("br",null),"Typically, we see partioning with streaming use cases, such as log analytics, where you keep X number of days of data, each day gets its own index, and searches are more likely to occur on recent data.",l.a.createElement("br",null),l.a.createElement("br",null),"In contrast, a single index might be something like a product catalog, where searches could be at any point in the index."),l.a.createElement("td",null,l.a.createElement(d.a,{className:e.formControl,variant:"filled"},l.a.createElement(E.a,{name:"indexType",value:f.indexType,onChange:w},l.a.createElement(u.a,{value:p.MULTI},"Partitioned index"),l.a.createElement(u.a,{value:p.SINGLE},"Single index"))))))})),F=Object(b.b)((function(){var e;return e=f.indexType===p.SINGLE?"How much data will your index hold?":"How much data will each index hold?",l.a.createElement(l.a.Fragment,null,l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,e)),l.a.createElement("td",null,l.a.createElement(h.a,{value:f.indexSize,label:"data size in GB?",name:"indexSize",onChange:w,variant:"filled"}))))})),B=Object(b.b)((function(){return f.indexType===p.MULTI?l.a.createElement(l.a.Fragment,null,l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"How many index partitions will you keep?")),l.a.createElement("td",null,l.a.createElement(h.a,{value:f.indexCount,label:"Number of partitions?",name:"indexCount",onChange:w,variant:"filled"})))):void(f.indexCount=1)})),O=function(){return f.clusterStorageGb=f.indexSize*f.replicationFactor*f.indexCount*g.RECOMMENDED_BUFFER*g.INFLATION_FACTOR,f.clusterStorageGb<1e3?f.clusterStorageGb.toLocaleString(void 0,{maximumFractionDigits:0})+" GB":f.clusterStorageGb<1e6?((f.clusterStorageGb+100)/1e3).toLocaleString(void 0,{maximumFractionDigits:1})+" TB":((f.clusterStorageGb+1e3)/1e6).toLocaleString(void 0,{maximumFractionDigits:3})+" PB"},z=function(){return f.storageGbPerIndex=f.clusterStorageGb/f.indexCount,f.storageGbPerIndex.toLocaleString(void 0,{maximumFractionDigits:1})};var T=Object(b.b)((function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"What is your replication factor?"),l.a.createElement("br",null)),l.a.createElement("td",null,l.a.createElement(h.a,{value:f.replicationFactor,label:"replication factor?",name:"replicationFactor",onChange:w,variant:"filled"}),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("li",null,"Best practice - ",l.a.createElement("a",{href:"https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-bp.html"},"at least 1 replica")," (replication factor = 2)"))))})),M=Object(b.b)((function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"Recommended storage:"),l.a.createElement("br",null),l.a.createElement("a",{href:"https://youtu.be/95kQkS51VnU?t=589"},"Based on this guidance"),l.a.createElement("br",null),l.a.createElement("br",null),"Note that ",l.a.createElement("a",{href:"https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/sizing-domains.html"},"these AWS docs")," call for a slightly different formula, but the results are more or less the same."),l.a.createElement("td",null,"= ",f.indexSize," GB storage * ",g.INFLATION_FACTOR," inflation factor * ",f.replicationFactor," replication factor  * ",f.indexCount," index partitions * ",g.RECOMMENDED_BUFFER," buffer factor",l.a.createElement("br",null),"= ",l.a.createElement("b",null,O())," recommended cluster storage.",f.clusterStorageGb>1e6?l.a.createElement((function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("b",null,"Important!")," - As your storage requirements are >= 1 PB, you should instead follow the recommendations ",l.a.createElement("a",{href:"https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/petabyte-scale.html"},"in this guide"),".")}),null):"")))})),P=Object(b.b)((function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("tr",null,l.a.createElement("td",{colSpan:"2"},l.a.createElement("b",null,"Storage tips and tricks: "),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("a",{href:"https://youtu.be/95kQkS51VnU?t=650"},"Reducing source data has the greatest impact on storage needs")),l.a.createElement("ul",null,l.a.createElement("li",null,"for example, ",l.a.createElement("a",{href:"https://youtu.be/95kQkS51VnU?t=730"},"removing @message")," has a huge impact")),l.a.createElement("li",null,l.a.createElement("a",{href:"https://youtu.be/95kQkS51VnU?t=817"},"Disable uneeded mapping features"))))))})),A=Object(b.b)((function(){return l.a.createElement("div",{className:"App"},l.a.createElement("header",null,l.a.createElement("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"})),l.a.createElement(C,null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[55,1,2]]]);
//# sourceMappingURL=main.3e533666.chunk.js.map