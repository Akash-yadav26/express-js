//versioning in node js
// 4.18.3
// 1St part --> 4
//2nd part --> 18
// 3rd part --> 3

// 3rd part (last part)--> minor fixes(optional)
//  like small changes like --> if 4.18.4 is come if you not download no effect will occure in system

//2nd part--> recommed bug fix or security fix
//4.19.1

// 1st part -->  major  and breaking update ( BREAKKING MEANS--> if you want your exsting code to get upadted it may be break the code )
// no problem occur when you bulid new project in updated version
// when you changing  3rd part of version it should be a new project

// if you want to install the your specific version
// terminal --> npm intsall express@4.17.2

//^4.21.2 --> ^ --> knows as carrrot
// 4th version and 21 is bug fix realse and 2 is minor realse
// ^(carrot) means --> isko to change nahi karna
// like ^4.20.5 --> you can install version between 
// ^4.18.2 --> 4.18.2-> < 5.0.0
// if we ^ symbol -> this means npm update automatically to leastes version  compatibale with 4
// ^-> install all recommended and minor fixes automattically
// ~4.18.2 --> only change minor fixes

//types of versioning
// between-> 1.0.0 - 2.9999.999
// greater than less than --> >=1.0.2 <2.1.2
// >1.0.2 <= 2.3.4
// <1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0
//~1.2.3
//3.3.x
//latest --> it install latest version but it not good  bec. this can aslo intsall any major update version aslo
