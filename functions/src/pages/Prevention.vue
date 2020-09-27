<template>
  <div>
  
    <h1 class="page-title">
      Prevention 
    </h1>
    <b-row>
      <b-col sm="12" md="12">
        <Widget
          title=""
          customHeader close collapse
        >
         <h3>Know how it spreads</h3>
         <ul class="a ml-4"><li>
           There is currently no vaccine to prevent coronavirus disease 2019 (COVID-19).

           </li>
           <li>
             The best way to prevent illness is to avoid being exposed to this virus.
           </li>
           <li>
           The virus is thought to spread mainly from person-to-person.

           </li>

           <li>
           Through respiratory droplets produced when an infected person coughs, sneezes or talks.

           </li>
           <li>
           These droplets can land in the mouths or noses of people who are nearby or possibly be inhaled into the lungs.

           </li>
                                 <img class="face" height="300" width="300" src="../assets/face.png" alt="">

           <li>
             Some recent studies have suggested that COVID-19 may be spread by people who are not showing symptoms.
           </li>
           
           </ul>
        </Widget>
      </b-col>
      <b-col sm="12" md="12">

        <Widget
          title=""
          customHeader close collapse
        >
        <h3>Wash your hands often</h3>
         <ul class="a ml-4"><li>
           Wash your hands often with soap and water for at least 20 seconds especially after you have been in a public place, <br> or after blowing your nose, coughing, or sneezing.

           </li>
                     <img class="wash" height="200" width="200" src="../assets/wash.png" alt="">

           <li>
             It’s especially important to wash:
             <ul class="a ml-4">
               <li>
                 Before eating or preparing food </li>
<li>Before touching your face </li>
<li> After using the restroom </li>
<li> After leaving a public place </li>
<li> After blowing your nose, coughing, or sneezing </li>
<li> After handling your mask</li>
<li> After changing a diaper</li>
<li> After caring for someone sick </li>
<li> After touching animals or pets </li>


             </ul>
           </li>
           <li>
If soap and water are not readily available, use a hand sanitizer that contains at least 60% alcohol. Cover all surfaces of your hands and rub them together until they feel dry.
           </li>

           <li>
          Avoid touching your eyes, nose, and mouth with unwashed hands.
people arrows light icon


           </li>
           
           </ul>

         
        </Widget>
              </b-col>

      <b-col sm="12" md="12">
        <Widget
          title=""
          customHeader close collapse
        >
         <h3>Avoid close contact</h3>
         <ul class="a ml-4"><li>
          Inside your home: : Avoid close contact with people who are sick.
If possible, maintain 6 feet between the person <br> who is sick and other household members.

           </li>
                                           <img class="wash" height="200" width="200" src="../assets/social.png" alt="">

           <li>
Outside your home: Put 6 feet of distance between yourself and people who don’t  live in your household.             <ul class="a ml-4">
               <li>
                Remember that some people without symptoms may be able to spread virus.
 </li>
<li>Stay at least 6 feet (about 2 arms’ length) from other people.
</li>
<li> Keeping distance from others is especially important for people who are at higher risk of getting very sick. </li>



             </ul>
           </li>


      
           
           </ul>

           
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';

export default {
  name: 'Typography',
  components: { Widget },
};
</script>

<style scoped>
ul.a{
  list-style-type: circle;
  
}
.wash{
  float:right;
  margin-top:-40px ;
  margin-right:140px ;
}
.face {
  float:right;
  margin-top:-180px ;
  margin-right:50px ;
}
</style>
