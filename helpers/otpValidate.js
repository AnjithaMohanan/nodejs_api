const otpVerification=async(otpTime)=>{
    try{
        console.log('millisecods is'+otpTime)

        const cDateTime=new Date();
      var differenceValue= (otpTime - cDateTime.getTime())/1000;
      differenceValue/=60;
      const minutes=Math.abs(differenceValue);
      console.log('Expired minutes:'+ minutes);

      if(minutes > 5){
        return true;

      }
      return false;

    }catch(error){
        console.log(error.message);

    }
}
module.exports={
    otpVerification
}