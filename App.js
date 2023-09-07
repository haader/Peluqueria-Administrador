import React, { useEffect } from "react";

import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ScreenTurnos from './screen/turnos/screenTurnos';
import ScreenClientes from './screen/clientes/screenClientes';
import ScreenGastos from './screen/gastos/screenGastos';

import ScreenPrecios from './screen/precios/screenPrecios';
import Tablas from './screen/tablas/tablas'
import { initMes } from "./database/init/initDatabase"

import ScreenStock from './screen/stock/screenStock';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {initTablaPrecios, initTablaStock, initTablaClientes, initTablaGastos, initTablaCompartir} from './database/init/initDatabase'

const Tab = createBottomTabNavigator();

export default function App() {

  //iniciamos las bases de datos!
      
      initTablaPrecios();
      initTablaStock();
      initTablaClientes();
      initTablaGastos();
      initTablaCompartir();

useEffect(() => {

    //iniciamos la tabla del mes actual
    

    //obtenemos los dias mes y anio actuales y guardamos las variables
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    //const day = currentDate.getDate();
    //creamos la tabla del mes actual si no existe
    
    initMes(`table${month}${year}`);

  }, []);


  return (
    <NavigationContainer>
        <Tab.Navigator 
         screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
  
            if (route.name === 'Turnos') {
              iconName = 'clock';
            } else if (route.name === 'Gastos') {
              iconName = 'cash-check';
            } else if (route.name === 'Clientes') {
              iconName = 'account';
            } else if (route.name === 'Stock') {
              iconName = 'cart';
            } else if (route.name === 'Precios') {
              iconName = 'tag';
            }
  
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }
          
            // Puedes agregar tu componente personalizado aquí para el título del header
            // Por ejemplo, un logo o cualquier otro componente
            // Ejemplo: <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            //            <Image source={require('./logo.png')} style={{ width: 30, height: 30 }} />
            //            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Mi App</Text>
            //          </View>
          
           , headerTitle: () => (
              <View style={{alignItems:'center'}}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>Rockeala</Text>
                <Text style={{ fontSize: 10, fontWeight: '200', color: 'black' }}>hair rock and coffee</Text>
                
              </View>
            ),headerTitleAlign: 'center',
  

          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          // tabBarActiveBackgroundColor: 'gray',
          tabBarInactiveBackgroundColor: 'white',
          
          tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold' },
        })}
        >
          {/* <Tab.Screen name="Tablas" component={Tablas} /> */}
          {/* <Tab.Screen name="Load" component={LoadingScreen} /> */}
          <Tab.Screen name="Clientes" component={ScreenClientes} />
          <Tab.Screen name="Turnos" component={ScreenTurnos} />
          
          <Tab.Screen name="Gastos" component={ScreenGastos} />
          <Tab.Screen name="Stock" component={ScreenStock} />
          <Tab.Screen name="Precios" component={ScreenPrecios} />
        </Tab.Navigator>
    </NavigationContainer>    
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
