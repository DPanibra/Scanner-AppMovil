import * as React from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase';
import 'firebase/firestore';


export default class BarcodeScannerExample extends React.Component {

  ref;

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      num: null,
      loading: true
    };
    this.ref = firebase.firestore().collection('usuarios');

  }



  async componentDidMount() {
    this.getPermissionsAsync();
    this.suscripcion = this.ref.onSnapshot((resp) => {
      let cont = 0;
      resp.forEach(element => {
        cont++;
      });
      this.setState({
        num: cont + 1,
        loading: false
      })
    })
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } if (this.state.loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    try {
      let verification = data.split(".");
      if (verification[0] == "MegaFiestaOchentera" && verification[3] == "VelvetProducciones") {
        alert("Entrada nro. " + this.state.num + "registrada: " + verification[2]);
        if (verification[2] == "ENTRADAVIP") {
          console.log('vip');
          this.addTicket('vip');
        } else if (verification[2] == "ENTRADAGENERAL") {
          console.log('general');
          this.addTicket('general');
        } else if (verification[2] == "ENTRADAVIPBOX") {
          console.log('box');
          this.addTicket('box');
        } else {
          alert('Error=> Codigo Inválido');
        }
      } else {
        alert('Error=> Codigo Inválido');
      }
    } catch (error) {
      alert('Error=> Codigo Inválido');
    }
  };


  addTicket(tipo) {
    this.ref.add({
      nro: this.state.num + 1,
      tipo: tipo,
      hora: this.getHora(),
      fecha: this.getFecha()
    })
  }
  getHora() {
    let hora = new Date();
    let h = hora.toTimeString();
    let hour = h.substring(0, h.indexOf(' '));
    return hour;
  };

  getFecha() {
    let fecha = new Date();
    let dd = fecha.getDate();
    let mm = fecha.getMonth() + 1;
    let yyyy = fecha.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
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
