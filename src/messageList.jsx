import React, {Component} from 'react';
import Message from './message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    let message = this.props.messages.map((message) => {
      return <Message username={ message.username }
                      content={ message.content }
                      key={ message.id }/>
    });
    let systemMessage = this.props.messageSystem.map((mess) => {
      return <Message messageSystem={mess.content} />
    });

    return (
      <div id="message-list">
        { message }
        { systemMessage }
      </div>
    );
  }
}
export default MessageList;