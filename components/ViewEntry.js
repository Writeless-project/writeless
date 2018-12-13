import React from 'react';
import { View } from 'react-native';
import { Text, Item, H1, Container } from 'native-base';

const ViewEntry = (props) => {
    const navigation = props.navigation;
    const selectedEntry = props.navigation.state.params;
    
    return (
        <Container>
            <Item style={{padding: 10, fontSize: 24}}>
                <Text style={{fontSize: 24, fontWeight: '500'}}>{selectedEntry.title}</Text>
            </Item>
            <Item style={{padding: 10}}>
                <Text style={{paddingTop: 18, paddingBottom: 18}}>{selectedEntry.content}</Text>
          </Item>
        </Container>
    )
};

export default ViewEntry;
