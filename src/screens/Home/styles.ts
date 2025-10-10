import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {},
  appLogo: {
    width: 40,
    height: 40,
  },
  add: {
  width:25,
    height:25,
    // justifyContent:"center"
   alignSelf:"center",
   
    // textAlign:"center"
  },
 
  headerContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:20,
    paddingVertical:10,
    alignItems:"center"
  }
});

export default styles;
