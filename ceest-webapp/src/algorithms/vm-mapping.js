

// Fetching Servers details 
import { findWeight, findRemainingResources} from './server-resources.js';
import { serverDetails } from './server-details.js';
// console.log(servers)

export const findOptimalServer = async (vm,servers) => {
    const Servers = servers.servers;
    console.log(Servers[0],"Optimal");
    let optimalServer = { uri:null, server_id:null,weight:null };
    let requiredResources = vm.vmMips;
    for(let server of Servers){
        let weightOfServer = await findWeight(server);
        console.log(weightOfServer);
        let remainingResources = await findRemainingResources(server);
        if(remainingResources>=requiredResources){
            if(!optimalServer['uri']){
                optimalServer['uri']=server;
                optimalServer['weight']=weightOfServer;
            }
            else{
                if(weightOfServer<optimalServer['weight']){
                    optimalServer['uri']=server;
                    optimalServer['weight']=weightOfServer; 
                }
            }
        }
    }

    if(optimalServer['uri']){
   
    let serverDetail = await serverDetails(optimalServer['uri'])
    console.log(serverDetail);
    let serverId = serverDetail.data.server_details.server_id ;
    optimalServer['server_id'] = serverId;
    console.log(optimalServer);
    return optimalServer;
    }
    else
    return {msg :"No Server Found on which we can put out virtual machine"};
}


// Calculating weight

