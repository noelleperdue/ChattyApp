import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Bar from './Bar.jsx';

// class App extends Component {

//   componentDidMount() {

//     this.ws = new WebSocket("ws://localhost:5000");

//     console.log("componentDidMount <App />");

//     this.ws.onopen = (event) => {
//       console.log("Connected to server");
//     };

//     this.ws.onmessage = (event) => {

//       let data = (JSON.parse(event.data))
//       console.log(data.type)
//       if(data.type == 'postMessage') {
//         let messageData = JSON.parse(event.data)
//         messageData.type = "incomingMessage";
//         this.setState({messages: this.state.messages.concat(messageData)})
//       }
//       if(data.type == 'postNotification') {
//         let incomingData = JSON.parse(event.data)

//         this.setState({messageSystem: this.state.messageSystem.concat(incomingData)})
//       }

//     this.ws.server = (res) => {
//     var serverMessage = JSON.parse(res.data);

//     if(typeof serverMessage == "number"){
//       this.state.usersOnline[0] = serverMessage;
//       this.setState(this.state);
//     }else{
//       this.setState({users: this.state.users.concat(serverMessage)});
//       this.setState(this.state);
//     }
//   }
//     }
//   }


//   constructor(props) {
//     super(props);
//     this.state = {
//       currentUser: {name: 'Anonymous'},
//       messages: [],
//       messageSystem: [],
//       usersOnline: []
//     };
//   }

//   newMessage = (event) => {
//     if(event.charCode === 13) {
//       let newNotif = {type: "postMessage", username: this.state.currentUser.name, content: event.target.value}
//       this.ws.send(JSON.stringify(newNotif))
//     }
//   }

//   username = (event) => {
//       if (event.charCode === 13) {
//       let newUsername={name: event.target.value}
//       !(event.target.value === '') ? this.setState({currentUser: newUsername}):this.setState({currentUser: {name:'Anonymous'}})
//        let notif = {type: "postNotification", content: this.state.currentUser.name + " changed their name to " + newUsername.name};
//        this.ws.send(JSON.stringify(notif));
//      }
//   }



//   render() {
//     console.log("Rendering <App/>");
//     return (
//       <div className="wrapper">
//         <nav>
//           <h1>Chatty</h1>
//           <h2>`{this.state.server}`</h2>

//         </nav>
//         <MessageList messages = { this.state.messages }
//                      messageSystem = { this.state.messageSystem }/>

//         <ChatBar currentUser = { this.state.currentUser }
//                  newMessage = { this.newMessage }
//                  username = { this.username }/>
//       </div>
//     );
//   }
// }
// export default App;

class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      messageSystem: [],
      usersOnline: 0
    };
  }

  componentDidMount() {

   this.ws = new WebSocket("ws://localhost:5000");

    console.log("componentDidMount <App />");

    this.ws.onopen = (event) => {
      console.log("Connected to server");
    };

    this.ws.onmessage = (event) => {

      let data = (JSON.parse(event.data))
      console.log(data.count);
      this.setState({usersOnline: data.count})

      if(data.type == 'postMessage') {
        let messageData = JSON.parse(event.data)
        messageData.type = "incomingMessage";
        this.setState({messages: this.state.messages.concat(messageData)})
      }
      if(data.type == 'postNotification') {
        let incomingData = JSON.parse(event.data)

        this.setState({messageSystem: this.state.messageSystem.concat(incomingData)})
      }

      this.setState({usersOnline: data.count})

    }
  }


  newMessage = (event) => {
    if(event.charCode === 13) {
      let newNotif = {type: "postMessage", username: this.state.currentUser.name, content: event.target.value}
      this.ws.send(JSON.stringify(newNotif));

    }

  }

  username = (event) => {
      if (event.charCode === 13) {
        let newUsername={name: event.target.value}
        if (!(event.target.value === '')){
          this.setState({currentUser: newUsername})
        } else {
          this.setState({currentUser: {name:'Anonymous'}})
        }
        let notif = {type: "postNotification",
                      content: this.state.currentUser.name + " changed their name to " + newUsername.name};
        this.ws.send(JSON.stringify(notif));
      }
    }



  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">

        <Bar usersOnline = { this.state.usersOnline }/>
        <MessageList messages = { this.state.messages }
                     messageSystem = { this.state.messageSystem }/>

        <ChatBar currentUser = { this.state.currentUser }
                 newMessage = { this.newMessage }
                 username = { this.username }/>
      </div>
    );
  }
}
export default App;