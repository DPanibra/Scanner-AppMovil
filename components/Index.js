import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements';

export default class Index extends Component {
    goScanner = () => {
        this.props.navigation.navigate('miScanner');
    }
    goTicket = () => {
        this.props.navigation.navigate('miTicket');
    }
    render() {
        return (
            <View>
                <Button
                    title="Scanner"
                    type="outline"
                    onPress={this.goScanner}
                />
                <Button
                    title="Tickets"
                    type="outline"
                    onPress={this.goTicket}
                />
            </View>
        )
    }
}
