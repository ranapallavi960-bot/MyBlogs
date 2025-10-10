import { StyleSheet } from "react-native";

const styles= StyleSheet.create({
      container: {
    
    flex: 1,
  },
  containerData: {
    flex: 1,
   alignContent:"center",
   paddingHorizontal:35
 
  },
   heading1Line1:{
    fontSize:25,
    fontWeight:"bold",
    color:"white"
  },
  heading1Lie2:{
     fontSize:25,
       
    color:"white"
  },
  headingBox:{
    alignItems:"center",
    marginTop:90
  },
  inputData: {
    alignItems: 'center',
    gap:10,
    marginTop:30
    
  },
  emailPasswordBox: {
    backgroundColor: '#d9d2e9',
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    padding:2
   
  },
 forgotPassword:{
  color:"#fff",
  textAlign:"right",
  marginTop:10
  
 },
 
  signUpBox:{
     backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
    padding:12,
    marginTop:35,
    alignSelf:"center"
  },
  signUp:{
   fontSize:16,
    alignSelf:"center"
  },
  divideLine:{
     backgroundColor: "#fff",
    width: 95,
    height: 1,
    margin: 5
  },
  divideSection:{
    flexDirection:"row",
    alignItems:"center",
    alignSelf:"center",
    marginTop:40
  },
  dividetext:{
    color:"#fff",
    fontSize:14
  },
  anotherWaysToSignUpBox:{
    flexDirection:"column",
    justifyContent:"space-between",  
    flex:1,
    marginBottom:40

  },
  googleFacebookLogo:{
    width:30,
    height:30,
    alignSelf:"center"
  },
  googlefacebookBtn:{
    width:"48%",
    backgroundColor:"#fff",
    padding:10,
    borderRadius:10
  },
  googleFacebookBox:{
    flexDirection:"row",
   gap:10,
   alignSelf:"center",
   marginTop:30
  },
  lastRowText:{
    color:"#3d1067",
    alignSelf:"center"
  },
  logIn:{
    color:"#fff"
  },
 loginBox:{
    
  }
})
export default styles