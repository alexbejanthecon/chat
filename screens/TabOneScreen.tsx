import {StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {useDispatch, useSelector} from "react-redux";
import {onLogout} from "../actions/auth";
import {userSelect} from "../selectors";

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const dispatch = useDispatch();
  const user = useSelector(userSelect);

  const handleLogut = () => {
    dispatch(onLogout());
    navigation.navigate('Root');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One aaa</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogut}>
        <Text style={styles.loginText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  loginBtn:
      {
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#048571",
      },
  loginText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  }
});
