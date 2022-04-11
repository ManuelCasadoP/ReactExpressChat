const getMessages=[
    {"time": 1649442545805, "source": 1111111111111, "content": "Aaaaaaaaa"},
    {"time": 1649442569035, "source": 2222222222222, "content": "Bbbbbbbbb"},
    {"time": 1649442569025, "source": 3333333333333, "content": "Ccccccccc"},
    {"time": 1649442569015, "source": 4444444444444, "content": "Ddddddddd"},
    {"time": 1649442599999, "source": 5555555555555, "content": "Eeeeeeeee"}
   ];

const getUsers=[
    {"id":2222222222222, "name": "Lucas"},
    {"id":4444444444444, "name": "Marcelo"},
    {"id":1111111111111, "name": "Andoni"},
    {"id":5555555555555, "name": "Nicolas"},    
    {"id":3333333333333, "name": "Jaime"}
];

    for (let i = 0; i < getMessages.length; i++) {

        let postHour = new Date(getMessages[i].time).toLocaleString();
        let whoIsSource = getMessages[i].source;
        
        for (let i = 0; i < getUsers.length; i++) {
            user = getUsers.find(item=>item.id === whoIsSource)
            break;
        }    

        console.log("----------------------------------------------------------------------");
        console.log(`Time: ${postHour}`);
        console.log(`User: ${user.name}`);
        console.log(`Msg : ${getMessages[i].content}`);
    }