import React from "react";
import {observer} from "mobx-react";
import {Icon, Message} from "semantic-ui-react";
import messageStore from "../stores/messageStore";

export default observer(() => {
    const className = `page-message ${messageStore.open ? "open" : "closed"}`;
    const icon = messageStore.icon ? <Icon name={messageStore.icon}/> : "";

    const messageProps = {};
    if (messageStore.type) {
        messageProps[messageStore.type] = true;
    }

    return (
        <div className={className}>
            <Message icon={true}
                     onDismiss={() => messageStore.close()}
                     {...messageProps}>
                {icon}
                <Message.Content>
                    <Message.Header>
                        {messageStore.header}
                    </Message.Header>
                    {messageStore.msg}
                </Message.Content>
            </Message>
        </div>
    );
});
