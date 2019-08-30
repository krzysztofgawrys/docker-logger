const metricInitial = {
    cpu: [{
        cpus: 0,
        percUsage: 0,
        system_cpu: 0,
        total_usage: 0
    }],
    memory: [
        {
            limit: 0,
            limitText: "",
            percUsage: 0,
            usage: 0,
            usingText: ""
        }
    ],
    networksData: [{
        received: 0,
        sent: 0
    }],
    pids: [0]
};

export default metricInitial;