import React, { Component } from 'react'
import { Text, View,ActivityIndicator,StyleSheet,ScrollView} from 'react-native'
import { ListItem } from 'react-native-elements'
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Tickets extends Component {
    ref
    constructor(props) {
        super(props);
        this.state = {
            ticket: [],
            loading: false,
        }
        this.ref = firebase.firestore().collection('usuarios')
    }
    componentDidMount() {
        this.suscripcion = this.ref.onSnapshot((resp) => {
            var tickets = [];
            resp.forEach(doc => {
                tickets.push({
                    nro: doc.data().nro,
                    tipo: doc.data().tipo
                })
            })
            this.setState({
                ticket: tickets.sort((a, b) => {
                    return (a.nro < b.nro)
                }),
                loading: true,
            })

        })
    }
    render() {
        if (this.state.loading == false) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        else {
            return (
                <ScrollView>
                    {
                        this.state.ticket.map((l, i) => (
                            <ListItem
                                key={i}
                                title={l.nro}
                                subtitle={l.tipo}
                            />
                        ))
                    }

                </ScrollView>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })
  