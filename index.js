// var myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:'us-east-1:cd0b1bff-3feb-4c4a-9047-8e83e8a4185e'});
// var myConfig = new AWS.Config({
//   credentials: myCredentials, region: 'us-east-1'
// });



// var authenticationData = {
//    Username : 'g.sivaraman@hotmail.com',
//    Password : 'JEEVA@jb2702'
// };







// var authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

// var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
// cognitoUser.authenticateUser(authenticationDetails,{
//    onSuccess : function(result){
//       console.log('access token + ' + result.getAccessToken().getJwtToken());
//    },

//    onFailure: function(err) {
//       alert(err);
//   }
// });


AWS.config.region = 'us-east-1'; 
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:92d88bd1-40a8-465f-bc90-7db22242fae8',
//     RoleArn : 'arn:aws:cognito-idp:us-east-1:359462017779:userpool/us-east-1_TrwK5RLab',
//     RoleSessionName : 'web',
//     LoginId : 'g.sivaraman@hotmail.com'
// },{region  : 'us-east-1'});

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
   IdentityPoolId : 'us-east-1:92d88bd1-40a8-465f-bc90-7db22242fae8'},{region : 'us-east-1'});




var ec2_api_version = {apiVersion : '2016-11-15'};

var ec2_region = new AWS.EC2({region: 'us-east-1', maxRetries: 15, apiVersion: '2016-11-15'});
ec2_region.config.update(ec2_api_version);



function server()
 {
  var hello = document.getElementById("demo").innerHTML = "Hello World";
 //InstanceCreatingMethod();
  vpcCreationMethod();
 //keyPairCreationMethod();
 }
 
  function InstanceCreatingMethod(){


     window.alert("Instance Creation Method Activated");

     var instanceParams = { 
        ImageId: 'ami-0080e4c5bc078760e',
        InstanceType : 't2.micro',
        KeyName : 'inframind',
        MinCount : 1,
        MaxCount : 1};
      
        var instancePromise = new AWS.EC2(ec2_api_version).runInstances(instanceParams).promise();
       instancePromise.then(function(data){
          window.alert(data);
          console.log(data);
          var instanceId = data.Instances[0].InstanceId;
          console.log("created instance "+instanceId);

          var tagParams = {Resources : [instanceId], Tags : [{ Key : 'Inframind' ,Value : 'SDK Sample'}]};

          var tagPromise = new AWS.EC2(ec2_api_version).createTags(tagParams).promise();

          tagPromise.then(function(data){
             console.log("Instance Tagged....");
          }).catch(function(err){
             console.log(err,err.stack);
          });
       }).catch(function(err){
          console.log("Instance Creation MEthod Error"+err,err.stack);
       });
  }

  function vpcCreationMethod(){
     window.alert("VPC creation method...");
     var params = { 
        CidrBlock : '10.0.0.0/16',
        DryRun : false,
        InstanceTenancy : 'default'
   };
  
    
     new AWS.EC2(ec2_api_version,ec2_region).createVpc(params,function(err,data){
         if(err) console.log("Vpc creation error "+err,err.stack);
         else console.log("Vpc creation successful "+data);
     })

     
  }

  function keyPairCreationMethod(){
     window.alert("Key pair creation method");
   var keypairParams = {
      KeyName : 'inframind',
      DryRun : true
   }

   new AWS.EC2(ec2_api_version).createKeyPair(keypairParams,function(err,data){
      if(err) console.log("Key Value pair creation error : "+err,err.stack);
      else console.log("key value pair created...");
   })
  }