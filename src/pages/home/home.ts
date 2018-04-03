import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from 'jquery'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('regresar') regresar;

  constructor(public navCtrl: NavController) {

              $("#regresar").click(function(e){
                    e.preventDefault();
                    $('#od-site').hide();
                     $('#country-list').show();;

                });

               $("#actualizar").click(function(e){
                    e.preventDefault();
                    $("#xlf").trigger('click');

                });

              function hideAddressBar(){
                  if(document.documentElement.scrollHeight<window.outerHeight/window.devicePixelRatio)
                        document.documentElement.style.height=(window.outerHeight/window.devicePixelRatio)+'px';
                        setTimeout(window.scrollTo(1,1),0);
                    }
                window.addEventListener("load",function(){hideAddressBar();});
                window.addEventListener("orientationchange",function(){hideAddressBar();});

            $( document ).ready(function() {

            function init()
            {

                function handleFileSelect(evt) {
                        var files = evt.target.files; // FileList object

                         var reader = new FileReader();
                 }

               if (localStorage.getItem("AllUsers") !== null) {
                    //processData(localStorage.getItem("AllUsers"),false)
                     processData(GetIntialList())
                }
                else{
                     processData(GetIntialList())
                }
            }

            init();
            var typingTimer;                //timer identifier
            var doneTypingInterval = 50;  //time in ms, 5 second for example
            var $input = $('.search');

            //on keyup, start the countdown
            $input.on('keyup', function () {
              clearTimeout(typingTimer);
              typingTimer = setTimeout(doneTyping, doneTypingInterval);
            });

            //on keydown, clear the countdown
            $input.on('keydown', function () {
              clearTimeout(typingTimer);
            });

            //user is "finished typing," do something
            function doneTyping () {

               $('#contact-list').hide();
               $('#SearchList').show();
                 var SearchList = JSON.parse(localStorage.AllUsers);
                 var Term = $('.search').val().toLowerCase();
                 $("#search-list").empty();

                 if($('.search').val() == '')
                 {
                      $('#SearchList').hide();
                      $('#contact-list').show();
                     $("#search-list").empty();
                 }
                 else
                 {
                   for(let S = 0; S < SearchList.length; S++)
                   {
                       this.entry = SearchList[S].split(',');
                       var sexo;
                       var string1 = this.entry[2].toLowerCase();
                       var string2 = this.entry[3].toLowerCase();

                        if(this.entry[6])
                            var email = '<br><a href="mailto:+'+this.entry[6]+ '">'+this.entry[6]+'</a>';
                        else
                            var email = '';
                         if(this.entry[7] == 'M')
                          sexo = 'style="color:blue"';
                      else if(this.entry[7] == "F" )
                          sexo = 'style="color:#FF69B4"';
                       if(string1.includes(Term) || string2.includes(Term))
                           $('#search-list').append('<li><div class="u-icon icono-user" '+sexo+'></div><div class="float-right">'+this.entry[2]+'<br>'+this.entry[3]+'<br>'+this.entry[4]+'<br> <a href="tel:+'+this.entry[0]+this.entry[1]+ '">Ofi. ('+this.entry[0]+') '+this.entry[5]+ ' </a><a href="tel:+'+this.entry[0]+this.entry[1]+'"><br>Mov. ('+this.entry[0]+') '+this.entry[1]+ ' </a>'+email+'</div></li>');
                   }
               }

            }
            $( ".icono-sync" ).click(function(event) {

                    event.preventDefault();
                    $('#country-list').hide();
                         populate()
                  });

           function populate()
           {

               $('#od-site').show();

            }

                function processData(allText,SaveData = true) {
                    var record_num      = 6;  // or however many elements there are in each row
                    var allTextLines    = allText.split(/\r\n|\n/);
                    var entries         = allTextLines[0].split(',');
                    var lines           = [];
                    var countries       = [];
                    var departments     = [];
                    var uniqueNames     = [];
                    var UserstoDept     = []

                    if(SaveData == true)
                        localStorage.setItem('AllUsers',JSON.stringify(allTextLines) );

                    if(SaveData == false)
                       allTextLines = JSON.parse(localStorage.getItem("AllUsers"))

                    //setup countries
                    for (var i = 0; i < allTextLines.length; i++) {
                         if(i == 0)
                             continue

                           entries = allTextLines[i].split(',');

                          countries.push(entries[4])

                          UserstoDept.push('users',entries )


                           if(entries[4] == 'Belize')
                           {
                               departments.push(['Belize',entries[3]])
                           }

                           if(entries[4] == 'Costa Rica')
                           {
                               departments.push(['Costa Rica',entries[3]])
                           }

                           if(entries[4] == 'Guatemala')
                           {
                               departments.push(['Guatemala',entries[3]])
                           }
                           if(entries[4] == 'Honduras')
                           {
                               departments.push(['Honduras',entries[3]])
                           }
                           if(entries[4] == 'Nicaragua')
                           {
                               departments.push(['Nicaragua',entries[3]])
                           }
                           if(entries[4] == 'Panamá')
                           {
                               departments.push(['Panamá',entries[3]])
                           }
                    }

                   localStorage.setItem('Departments',JSON.stringify(departments) )

                    $.each(countries, function(i, el){
                        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
                    });

                   uniqueNames.sort()

                   localStorage.setItem('Countries',JSON.stringify(uniqueNames) )

                  DisplayContries();

                  $( ".li-country a.country-a" ).click(function(event) {

                    event.preventDefault();

                         $(this).parent().find('ul.Department').toggle()
                  });

                  $( ".li-departments a.department-a" ).click(function(event) {

                     event.preventDefault();
                         $(this).parent().find('ul.users').toggle()
                  });

                }



                function DisplayContries()
                {
                    var Countries = JSON.parse(localStorage.Countries);
                    var Abbr = '';
                    var style = '';
                    for(let i = 0; i < Countries.length; i++)
                    {
                       if($('#no-hay-contactos').length > 0 )
                       {
                           $('#no-hay-contactos').remove()
                        }

                       if(Countries[i] == 'Belize')
                       {
                           Abbr  = 'BZ'
                           style = 'style="background-color:#3bb19a"'

                       }
                       if(Countries[i] == 'Costa Rica')
                       {
                           Abbr = 'CR'
                           style = 'style="background-color:#4ad386"'
                       }
                       if(Countries[i] == 'El Salvador')
                       {
                           Abbr = 'SV'
                           style = 'style="background-color:#a66cbf"'
                       }
                       if(Countries[i] == 'Guatemala')
                       {
                           Abbr = 'GT'
                           style = 'style="background-color:#9dacad"'
                       }
                       if(Countries[i] == 'Honduras')
                       {
                           Abbr = 'HN'
                           style = 'style="background-color:#f4a11f"'
                       }
                       if(Countries[i] == 'Nicaragua')
                       {
                           Abbr = 'NI'
                           style = 'style="background-color:#2ab165"'
                       }
                       if(Countries[i] == 'Panama')
                       {
                           Abbr = 'PA'
                           style = 'style="background-color:#0054ff"'
                       }

                       var HTML = '<li class="li-country"><a class="country-a" href="#"><span class="abbr" '+style+'>'+Abbr+'</span>'+Countries[i]+'</a>'+DisplayDepartments(Countries[i])+'</li>'

                       $('#country-list').append(HTML)

                    }

                }

                function DisplayDepartments(Country)
                {

                    var Department          = JSON.parse(localStorage.Departments);
                    var CountryDepartment   = [];
                    var uniqueNames         = [];
                    var CountryString       = String(Country);

                    for(let j = 0; j < Department.length; j++)
                    {

                       if(Department[j][0] == CountryString)
                           CountryDepartment.push(Department[j][1])
                    }

                    $.each(CountryDepartment, function(i, el){
                        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
                    });

                    uniqueNames.sort()
                    var DeptHTML = '<ul class="Department">';
                   for(let k = 0; k < uniqueNames.length; k++)
                   {

                      DeptHTML += '<li class="li-departments"><span class="icono-caretRight"></span><a class="department-a" href="#">'+uniqueNames[k]+ '</a>'+UserDeptCountry(Country,uniqueNames[k] )+'</li>';
                   }
                   DeptHTML += '</ul>';

                   return DeptHTML;

                }

                function UserDeptCountry(Country, Dept )
                {

                   var Users = JSON.parse(localStorage.AllUsers);
                   Users.sort();
                   var sexo;
                   var UserHTML = '<ul class="users">';
                   let test33 = [];
                   for(let D = 0; D < Users.length; D++)
                   {

                       test33 = Users[D].split(',');

                      if(test33[7] == 'M')
                          sexo = 'style="color:blue"';
                      else if(test33[7] == "F" )
                          sexo = 'style="color:#FF69B4"';
                       if(test33[6])
                            var email = '<br><a href="mailto:+'+test33[6]+ '">'+test33[6]+'</a>';
                        else
                            var email = '';
                       if(Country == test33[4] && Dept == test33[3])
                            UserHTML +=  '<li><div class="u-icon icono-user" '+sexo+'></div><div class="float-right">'+test33[2]+'<br>Mov. <a href="tel:+'+test33[0]+test33[1]+ '">+'+test33[0]+' '+test33[1]+ ' </a><br>Ofi. <a href="tel:+'+test33[0]+test33[5]+ '">+'+test33[0]+' '+test33[5]+ ' </a>'+email+'</div></li>';
                   }
                   UserHTML += '</ul>';

                   return UserHTML;

                }

           function GetIntialList()
           {

                    var CSV =   'CodArea,Linea,Usuario,Departamento,pais,Linea 2,email,Sexo'+ "\r\n" +
                                '502,30278119,Hermana Diana Dennis (CCM),CCM,Guatemala,23272300,,F'+ "\r\n" +
                                '502,30670565,Manuel Recinos (Ing. Templo),Templo de Guatemala,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30284840,Edy Salazar,Templo de Guatemala,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40404386,Maria Morales (Asuntos Publicos),Asuntos Publicos,Guatemala,23272300,,F'+ "\r\n" +
                                '502,30283943,Herbert Alvarado,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,45185027,Abinadi Mena,Sistemas de Informacion,Guatemala,23272300,cmena@ldschurch.org,M'+ "\r\n" +
                                '502,57083529,Adolfo Alvarez,Sistemas de Informacion,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57083625,Alberto Velasquez,Templo de Guatemala,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55509146,Alejandro Lopez,Proyectos Especiales,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713820,Ronald Garcia,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52023347,Alicia Salan,Servicios Misionales,Guatemala,23272300,,F'+ "\r\n" +
                                '502,57042888,Williams Perez,Templo de Quetzaltenango,Guatemala,23272300,,M'+ "\r\n" +
                                '502,58939287,Allangumer Velasquez,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57083626,Alma Cruz,Viajes,Guatemala,23272300,,F'+ "\r\n" +
                                '502,40713533,Alvaro Gomez,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52083208,Alvaro Monasterio,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53062055,Ana Suret Lopez,Construcciones,Guatemala,23272300,,F'+ "\r\n" +
                                '502,57047510,Jared Ocampo,Family Search,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713509,Arnoldo Alexander Choc,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57302111,Erick Arriaga,Templo de Guatemala,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57049872,Asirio Zea,Templo de Guatemala,Guatemala,23272300,,M'+ "\r\n" +
                                '502,58949551,Benjamin Poou,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57030931,Edwin Rivera,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53035819,Blanca Gramajo,CAS,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53700014,Brad Ruano,Materiales,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52016393,Hermana Frampton (Medical),Medico del Area,Guatemala,23272300,,F'+ "\r\n" +
                                '502,50310169,Carlos Arredondo,Bienes Raices,Guatemala,23272300,,M'+ "\r\n" +
                                '502,45183977,Carlos Astorga,Planning,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713160,Carlos Godinez,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,58938957,Carlos Humberto Vasquez ,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55283752,Carlos Ibanez,Templo de Guatemala,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30052590,Carlos Valladares,Sistemas de Informacion,Guatemala,23272300,valladaresce@ldschurch.org,M'+ "\r\n" +
                                '502,57748704,Carlos Vielman,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713836,Casa de Huespedes Xela (Staff),Templo de Quetzaltenango,Guatemala,23272300,,M'+ "\r\n" +
                                '502,58934937,Cesar Colon,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,45185202,Cesar Morales,Proyectos Especiales,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40478978,Cesar Perez,Templo de Quetzaltenango,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30222509,Cristian Merdia,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40048679,Daniel Hernandez,CAS,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55233155,Daniel Ovalle,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53035876,Daniel Ramos,CAS,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55233442,Dany Ordonez,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53776145,David Molina,CAS,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40804422,Diana Melgar,Recursos Humanos,Guatemala,23272300,,F'+ "\r\n" +
                                '502,55509447,Alex de Leon,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,49743899,Jose Alberto Lopez,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30670575,Maria Hernandez,Recursos Humanos,Guatemala,23272300,,F'+ "\r\n" +
                                '502,52032557,Paola Leysan,PEF,Guatemala,23272300,,F'+ "\r\n" +
                                '502,57040068,Donald Morales,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,58022099,Dony Barrios,Templo de Quetzaltenango,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57083537,Douglas Rodas,MCA,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30056917,Eber Garcia,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30413468,Edin Romeo Torres Garcia,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713729,Eduardo Jacobo Lemus,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30051968,Steven Spencer,Legal,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30045613,Elder Whitter,Bienestar,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57381338,Francisco Paz,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30046601,Ana Elizabeth Arana,PEF,Guatemala,23272300,,F'+ "\r\n" +
                                '502,30413440,Elder Harris (Dentista 3),Clinica Tio Juan,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40404550,Elder Reyna,Asuntos Publicos,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55511952,Elder Hogge (Dentista 1),Clinica Tio Juan,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30045682,Elder Johnson,Presidencia de Area,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30222538,Elder Curtiss (Medico del area),Medico del Area,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40456352,Dentista 2 Tio Juan,Clinica Tio Juan,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55525332,Walter de Leon,Registros LUF,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40177811,Victor Rojas,Recursos Humanos,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52088890,Elder Frampton (Medico del Area),Medico del Area,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30050596,Dan Morris (Presidente CCM),CCM,Guatemala,23272300,,M'+ "\r\n" +
                                '502,49743895,Sergio Castanon,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713747,Elias Juarez,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,58002500,Eliu Chan,Bienestar,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52020869,Hermanos Barrera (Bienestar),Bienestar,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53046939,Elvis Gomez,PEF,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53182128,Oscar Vasquez,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55232805,Emilio Cirilo,Family Search Imaging,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53186209,Enio Molina,Registros MLU,Guatemala,23272300,,M'+ "\r\n" +
                                '502,45184234,Erik Rivera,Seguridad,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30223874,David Contreras,CAS,Guatemala,23272300,,M'+ "\r\n" +
                                '502,59027095,Fernando Lopez,Registros LUF,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55232966,Felix Miranda,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57097670,Francisco Dubon,CCM,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40460955,Jonathan Contreras,Servicios Misionales,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52032621,Francisco Rosales,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,44876766,Carlos Marroquin,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,59011910,Froilin Herrera,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52055472,Fulvia Alvarado,Arquitectura,Guatemala,23272300,,F'+ "\r\n" +
                                '502,40713166,Guillermo Eduardo Cabrera,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,45184177,Guillermo Francisco Cabrera,Recursos Humanos,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52016394,Hari Pena,Planning,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40712802,Leonardo de Leon,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40589351,Hector David Hernandez,MCA,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713397,Hector Ignacio Enriquez,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57083532,Henry Barrera,Templo de Quetzaltenango,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55292619,Hermana Norman (Templo),Templo de Guatemala,Guatemala,23272300,,F'+ "\r\n" +
                                '502,52018079,Hermana Morris (CCM),CCM,Guatemala,23272300,,F'+ "\r\n" +
                                '502,30050708,Vickman Chavez,Bienes Raices,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30413292,Hermana Wood (Mark Wood),Expatriado,Guatemala,23272300,,F'+ "\r\n" +
                                '502,30209073,Daniel Spencer (Steve Spencer),Legal,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30413480,Hijos Javier Monestel,Expatriado,Guatemala,23272300,,F'+ "\r\n" +
                                '502,30413473,Harold Perez,Sistemas de Informacion,Guatemala,23272300,perezhs@ldschurch.org,M'+ "\r\n" +
                                '502,57083524,Hugo Valenzuela,Viajes,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40714016,Humberto Perez,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57062222,Ingrid Perussina,Planning,Guatemala,23272300,,F'+ "\r\n" +
                                '502,40054471,Ivonne de Leon,CCM,Guatemala,23272300,,F'+ "\r\n" +
                                '502,30226211,Jaime Carranza,Templo de Guatemala,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40197079,Alberto Marves,DTA,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713226,Javier Antonio Alvizurez,CCM,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40304685,Javier Monestel,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,45184030,Jhony Monzon,MCA,Guatemala,23272300,,M'+ "\r\n" +
                                '502,58953224,Joel Guarcax,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30282225,Joel Hamblin (Contralor),MCA - Contralor,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52063206,Francisco Ramirez,Vehiculos,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55233064,Jorge Bernardo Perez,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,58929694,Jorge Flores Barrios,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57083521,Jorge Mac,Propiedades,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52081888,Jose Boza,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52063810,Jose Ignacio Castillo,Bienestar,Guatemala,23272300,,M'+ "\r\n" +
                                '502,45183899,Jared Choy,Sistemas de Informacion,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713467,Jose Luis  Cux,CCM,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52001172,Jose Mariz Tzic,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55233418,Jose Mayen,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,46123417,Jose Ozuna,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53427555,Byron Coyoy,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,45184151,Josue Echeverria,Construcciones,Guatemala,23272300,,M'+ "\r\n" +
                                '502,48320060,Josue Lucas,Compras,Guatemala,23272300,,M'+ "\r\n" +
                                '502,58933360,Bruno Vasquez,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713638,Elvis Flores,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,45184930,Julio Enrique Alvarado,Asuntos Pœblicos,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53192175,Julio Jose Omar Lopez,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,58033346,Daniel Johnson,Presidencia de Area,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30052676,Karen Rodas,Asuntos Pœblicos,Guatemala,23272300,,F'+ "\r\n" +
                                '502,53035700,Kelvin Escobar,Bienestar,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55283749,Juan Gabriel Granados,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713914,Adilia Galan (CAS),CAS,Guatemala,23272300,,F'+ "\r\n" +
                                '502,53086685,Elder McLemore,Sistemas de Informacion,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55232860,Luis Emilio Lopez,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,59186223,Luis Ochoa,Propiedades,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52016395,Luis Urizar,Tesorer’a,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53189902,Manuel Garcia,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57513627,Manuel de Leon,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40119212,Marcelo Rabbe,CAS,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713213,Marco Vinicio Barrios,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52032629,Maria Vicente,MCA,Guatemala,23272300,,F'+ "\r\n" +
                                '502,52023587,Jose Canizales,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,58958560,Luis Guzman,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713148,Mario Garcia,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40704748,Merly Lopez,Bienes Raices,Guatemala,23272300,,M'+ "\r\n" +
                                '502,50468709,Mark Wood (Legal),Legal,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57083522,Marlon Garcia,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55506143,Marta Escobar,Servicios Misionales,Guatemala,23272300,,F'+ "\r\n" +
                                '502,40133179,Mayra Monroy,Materiales,Guatemala,23272300,,F'+ "\r\n" +
                                '502,46556874,Melvin Recinos,OyM,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713062,Milton Cajas,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55244728,Nahomy Batres,PEF,Guatemala,23272300,,F'+ "\r\n" +
                                '502,30050544,Nathalee Paiz,Recursos Humanos,Guatemala,23272300,,F'+ "\r\n" +
                                '502,52069506,Nery Martinez,Sistemas de Informacion,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30209076,Elder Clason (Legal),Legal,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55508273,Oliber Samayoa,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30052574,Omar Perez,PEF,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55283750,Oscar Abadillo,Templo de Guatemala,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40420850,Oscar Romero,Centro de Distribucion,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55220451,Francisco Paz,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713998,Oswaldo Tiul,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52045095,Pati de Alvarez,Presidencia de Area,Guatemala,23272300,,F'+ "\r\n" +
                                '502,52014620,Paul Higueros,Centro de Distribucion,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57049870,Pedro Garcia,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40175008,Percy Santizo,PSD,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30047622,Poloski Cordon,Templo de Quetzaltenango,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52030333,Presidente Norman(Templo),Templo de Guatemala,Guatemala,23272300,,M'+ "\r\n" +
                                '502,45184739,Pres. Jose Mar’a Galvez (Templo Xela),Templo de Quetzaltenango,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30907627,RENAP Movil (Emilio Cirilo),Family Search Imaging,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52014606,Arturo Rodriguez,Bienestar,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57083513,Rienzi Falabella,Compras,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52031050,Roberto Cajas,CCM,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40714131,Federico Lopez,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,55233436,Dino Beteta,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57285420,Rudy Rodriguez,Seguridad,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30209144,Ingrid Garcia,Bienestar,Guatemala,23272300,,F'+ "\r\n" +
                                '502,53067169,Salomon Alvarez,PEF,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57054077,Sam Galvez,Propiedades,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40211315,Sara del Cid,Legal,Guatemala,23272300,,F'+ "\r\n" +
                                '502,58934540,Selvin Vel‡squez,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53087762,Elvis Zepeda,Construcciones,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40177632,Lidia Beatriz de çvila,SEI,Guatemala,23272300,,F'+ "\r\n" +
                                '502,55232218,Set Quinonez,Legal,Guatemala,23272300,,M'+ "\r\n" +
                                '502,52026309,Telma Chacon,Presidencia de Area,Guatemala,23272300,,F'+ "\r\n" +
                                '502,30222544,Julio de Leon,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53086884,Valerio Davila,Registros LUF,Guatemala,23272300,,M'+ "\r\n" +
                                '502,59186221,Vicente Rodriguez,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,59901314,Rounel Vasquez,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30264834,Victor Coc,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40713749,Vinicio Franco,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40712949,Vinicio Hernandez,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57083772,Cristian Hernandez,Registros LUF,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40453941,Wilber Barrios,Construcciones,Guatemala,23272300,,M'+ "\r\n" +
                                '502,53186210,Freedy Vasquez,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30052690,Wilian Can,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,57509782,Willian Cardona,SEI,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40712749,Wilmer Antonio Barrios,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,30265464,Wilson Godoy,Centro de Servicios,Guatemala,23272300,,M'+ "\r\n" +
                                '502,40178044,Yolanda Mazariegos,Bienestar,Guatemala,23272300,,F'+ "\r\n" +
                                '503,78532941,Jose Luis Echeverria,Centro de Servicios,El Salvador,23272400,,M'+ "\r\n" +
                                '503,78512355,Juan Antonio Castro,Centro de Servicios,El Salvador,23272400,,M'+ "\r\n" +
                                '504,99695624,Ricardo Valladares,Centro de Servicios,Honduras,23272400,,M'+ "\r\n" +
                                '504,99926108,Alexander Ram’rez,Centro de Servicios,Honduras,23272400,,M'+ "\r\n" +
                                '505,85108542,Jose Ernesto Maravilla,Centro de Servicios,Nicaragua,23272400,,M'+ "\r\n" +
                                '505,88531165,Roger Perez,Compras,Nicaragua,23272400,,M'+ "\r\n" +
                                '506,88881616,Manuel Campos,Centro de Servicios,Costa Rica,23272400,,M'+ "\r\n" +
                                '506,88963434,Minor Rodriguez,OYM,Costa Rica,23272400,,M'+ "\r\n" +
                                '507,66164258,Nelson Altamirano,Centro de Servicios,Panamá,23272400,,M'+ "\r\n" +
                                '507,64005960,Camilo Mena,Oym,Panamá,23272400,,M'+ "\r\n" +
                                '501,6101310,Jaime Chi,Centro de Servicios,Belize,23272400,,M';
                                 CSV.split( "\n" ).join( "\r\n" );
                                return CSV;
           }



            });

  }

}
