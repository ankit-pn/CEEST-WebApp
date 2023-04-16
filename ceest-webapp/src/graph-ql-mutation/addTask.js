import { findOptimalVm } from "../algorithms/job-scheduling";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const addTask = async (task, server) => {
    console.log(task);
    console.log(server, typeof (server));
    const optimalVm = await findOptimalVm(task, { servers: server })
    console.log(optimalVm);
    const targetUri = optimalVm['uri'];
    console.log("target",targetUri);
    const client = new ApolloClient({
        uri: targetUri,
        cache: new InMemoryCache(),
    });

    const input = {
        communicationCost: parseInt(task['communicationCost']),
        taskDeadline: task['taskDeadline'],
        taskLength: parseInt(task['taskLength']),
        taskName: task['taskName'],
        vm_id: optimalVm['vm_id']
    };
    console.log(input);
    const { data } = await client.mutate({
        mutation: gql`
         mutation Mutation($input: CreateTaskInput!) {
            create_task(input: $input) {
                communicationCost
                server_id
                taskDeadline
                taskLength
                taskName
                task_id
                vm_id
            }
            }
        `,
        variables: { input },
    });
    console.log(await data);
    return await data.create_vm;
}

