import { ApolloClient, InMemoryCache, gql }  from '@apollo/client';

export const serverDetails = async (uri) => {
    const client = new ApolloClient({
        uri: uri,
        cache: new InMemoryCache()
    });

    const GET_SERVER = gql`query Query {
        vms {
          server_id
          vmMips
          task {
            communicationCost
            server_id
            taskDeadline
            taskLength
            taskName
            task_id
            vm_id
          }
          vmName
          vm_id
        }
        server_details {
          server_id
          server_name
          total_mips
          unit_power_cost
        }
      }`

    try {
        const result = await client.query({
            query: GET_SERVER
        });
        return result;
    } catch (error) {
        return error;
    }

}


