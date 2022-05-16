import React ,{useState,useEffect} from 'react';



function addTodo(){

    const [text,setText] = useState('');


    return(
        <Space direction="vertical">
        <Title></Title>
        <Title>Welcome!</Title>
        <Text>To get started, add some items to your list:</Text>
        
        <Space direction="horizontal">
            <Input placeholder="i want to do ..." value={text} onChange={inputHandler} />
            <Button type="primary" onClick={addButtonHandler}>add</Button>
        </Space>
                    
        </Space>
    );
    


}

export default addTodo;

