import { findOptimalServer } from "../algorithms/vm-mapping";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const addVm = async (vm, server) => {
    console.log(vm);
    console.log(server , typeof(server));
    const optimalServer = await findOptimalServer(vm, {servers: server})
    console.log(optimalServer);
    const targetUri = optimalServer['uri'];

    const client = new ApolloClient({
        uri: targetUri,
        cache: new InMemoryCache(),
    });

    const input = {
        vmMips: parseInt(vm.vmMips),
        vmName: vm.vmName,
    };
    console.log(input);
    const { data } = await client.mutate({
        mutation: gql`
          mutation Create_vm($input: CreateVMInput!) {
            create_vm(input: $input) {
              server_id
              task {
                communicationCost
                server_id
                taskDeadline
                taskLength
                taskName
                task_id
                vm_id
              }
              vmMips
              vmName
              vm_id
            }
          }
        `,
        variables: { input },
    });
    console.log(await data);
    return await data.create_vm;
}

