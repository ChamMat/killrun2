const levelDatas = [
    {
        // 0 : défault
        map: 
        [
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
        ],
        background: [],
        backgroundAnimation: [""],
    },
    {
        // 
        map: 
        [
            [10,10,10,10,10,99,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
            [10,10,10,10,10,10,10,10,10,10,11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
            [10,10,10,10,11,10,10,10,10,10,11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
            [11,10,10,10,10,11,10,10,10,10,11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
            [11,11,10,10,10,11,10,11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
            [11,11,11,11,11,11,11,11,11,11,11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
            [11,10,10,10,10,10,10,10,11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
            [11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
            [11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [11,10,10,10,10,10,10,10,98,10,10,10,10,10,11,10,10,10,10,10,10,10,10,10,11,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [11,10,10,10,10,10,10,10,10,10,10,10,10,10,11,10,10,10,10,11,10,98,10,10,11,10,10,10,10,10,10,10,10,10,10,10,10,11,11],
            [11,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,10,10,10,10,10,10,10,10,10,10,10,10,11,11],
            [11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11],
            [11,10,10,10,98,10,10,98,10,98,10,10,10,10,98,10,10,10,10,10,10,98,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11],
            [11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11],
            [11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11],
            [11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11],
            [11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11],
            [11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11],
            [11,10,10,10,10,11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11],
            [11,10,10,10,10,11,10,11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11],
            [11,10,10,10,10,11,10,11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11],
            [11,10,10,10,10,11,10,11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11],
            [11,11,11,11,11,11,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
        ],
        background: ["background"],
        backgroundAnimation: [""],
    },
    {
        // 
        map: 
        [
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [10,10,10,11,10,10,11,11,11,10,10,10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,11,10,11,10,10,10,10,11,10,10,10,10,10,10],
            [10,10,11,11,10,10,11,11,11,10,10,10,11,11,11,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10,10,10,10,10,11,10,10,10,10,10,10],
            [10,10,10,11,10,10,10,10,11,11,11,10,10,10,10,10,10,10,10,10],
            [10,10,10,11,10,10,10,10,11,11,11,10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,11,11,11,10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
        ],
        background: ["background"],
        backgroundAnimation: [""],
    },
]

export default levelDatas;