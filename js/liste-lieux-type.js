// Code qui affiche : 
// - tous les types de lieux
// - les lieux classés par types
// - les fiches lieux quand on clique sur un des lieux (informations, commentaires, notes, favoris)


	function loadListeLieuxType() {
		var ListeLieuxType = $('#liste_lieuxtype ul');
		$.ajax({
			type: 'GET',
			url: 'http://www.argosapps.fr/retro_php_server/liste-lieuxType.php?&jsoncallback=?',
			dataType: 'JSONp',
			timeout: 8000,
			success: function(data) {
				$.each(data, function(i,item){
					
					//la valeur de l'id du lien (a) correspond à l'id du type dans la table 				
					ListeLieuxType.append('<li><a id="'+item.id+'" href="#" rel="external"><img src="'+item.icone_type_lieu+'" alt=""/>'+item.type_lieu+'<img src="http://argosapps.fr/retro-appli-accordeon-fiches/img/arrow_down.png" alt="icone flèche" class="arrow_icon"/></a><ul id="type-lieu-item"></ul></li>');	
					$('#ul_liste_lieuxtype').listview('refresh');	
				});
						
				
				//au clic sur un des types de lieux, on va récupérer les lieux qui correspondent à ce type
				 $('#ul_liste_lieuxtype li a').click(function(e) {
				 if ( $(this).hasClass("opened") == true) {
						$('#ul_liste_lieuxtype li ul').hide();
						$('#ul_liste_lieuxtype li a').removeClass("opened");
						$(".arrow_icon").attr("src","http://argosapps.fr/retro-appli-accordeon-fiches/img/arrow_down.png");
					} else {
						$('#ul_liste_lieuxtype li a').removeClass("opened");
						$(this).addClass("opened");
						$(".arrow_icon").attr("src","http://argosapps.fr/retro-appli-accordeon-fiches/img/arrow_down.png");
						$(".opened .arrow_icon").attr("src","http://argosapps.fr/retro-appli-accordeon-fiches/img/arrow_up.png");
					//on cache toutes les sous-listes 
					$('#ul_liste_lieuxtype li ul').hide();
				 
							//on récupère la valeur de l'id du lien sur lequel l'utilisateur a cliqué, et on la stocke dans la variable idcatlieu
							var idcatlieu = $(this).attr('id');
							
							//on sélectionne le ul en prenant le parent (li) du lien surlequel on a cliqué (this), puis en prennant le fils "ul" de celui-ci (fils du li)
							 var ulduntype = $(this).parent("li").children("ul");
							ulduntype.html("Les Rétro lieux :");

						$.ajax({
								type: "GET",
								dataType: 'jsonp',
								url: 'http://www.argosapps.fr/retro_php_server/lieux-selon-type.php?callback=?',
								data: ({'idcatlieu' : idcatlieu}), //on passe la variable en data pour la récupérer en PHP par $_GET['idcatlieu']
								success: function(data){
								
									console.log('Succès !');
									
									$.each(data, function(i, item) {
																		
										var nomlieu  = item.nom_lieu;
										var typelieu  = item.type_lieu;
										var idlieuduntype = item.idlieu;
										var iconelieutype = item.icone_lieu;
									
										
										ulduntype.show();
										//on va ajouter les sous listes à puces (lieux d'un type)
										
										//dans le ul en question, on affiche les lieux sous forme de sous-meu
										ulduntype.append('<li class="ui-li-has-thumb ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c remove-btn"><a class="ui-btn" id="'+idlieuduntype+'" href="#" rel="external"><img src="'+iconelieutype+'" alt=""/><br/><p>'+nomlieu+'</p></a><div id="fiche-lieu-dutype-'+idlieuduntype+'"></div></li>');
										
										
									});
									
									
									
									$('#ul_liste_lieuxtype li ul li a').click(function(e) {
												//on va masquer tous les div au départ(contenant les fiches lieux)
											$('#ul_liste_lieuxtype li ul li div').hide();
												//alert("la fiche arrive bientot !!");
												var idlieu = $(this).attr('id');
															
												//on va récupérer les infos de ce lieu ==> appel ajax ?
												// ************************************************************************************** //
													$.ajax({
														type: "GET",
														dataType: 'jsonp',
														url: 'http://www.argosapps.fr/retro_php_server/fiche-lieu-selon-lieu-liste.php?callback=?',
														data: ({'idlieu' : idlieu}), //on passe la variable en data pour la récupérer en PHP par $_GET['idlieu']
														success: function(data){
														
															console.log('Succès fiche lieu !');
															console.log(data); 
															
															
																		//On prépare
																		var $divlieu = '#fiche-lieu-dutype-' + idlieu;
																		//alert($divlieu);
																		$($divlieu).show();
																		
																		$($divlieu).html("<div id='contenu-fiche-t' data-role='content'>"+
														"<div id='fiche_title'>"+
														
														"</div><!-- /page_title -->"+

														"<div id='banniere_lieu'>"+
														"</div>"+
														"<div class='type-lieu-zone'>"+
														"</div>"+
														
														"<!-- info lieu-->"+
														"<div id='info_lieu'>"+
															"<h2 class='infospratiques'>Infos pratiques</h2>"+
															"<ul class='infos_center'>"+
																"<img src='img/flaticon-calendar.png' alt='' />"+
																"<li class='annee_construction'></li>"+
																"<img src='img/flaticon-geoloc.png' alt='' />"+
																"<li class='adresse'></li>"+
																"<li class='lieu-arrondissement'></li>"+
														
																"<img src='img/flaticon-siteweb.png' alt='' />"+
																"<li class='site_web'></li>"+
														
																"<img src='img/flaticon-telephone.png' alt='' />"+
																"<li class='telephone'></li>"+
														
																"<img src='img/flaticon-metro.png' alt='' />"+
																"<li class='metro'></li>"+
															"</ul>"+
															"<ul>"+
															"</ul>"+
															"</div><!-- /info lieu-->"+

															"<br/>"+
														
														"<!--descrip lieu-->"+
														"<h2 class='infospratiques'>Rétrospective sur le lieu</h2>"+
														"<div id='descrip_lieu'></div><!-- /descrip lieu-->	"+
														
														"<br/>"+
														"<div id='favoris-zone'>"+
															"<img src='img/lieux/favoris-icone-medium.png' alt='' /><p>Un coup de coeur ?</p>"+
															"<form id='favoris-form'>"+
															"<div id='hidden-favoris'>"+
															"</div>"+
															"<input type='submit' name='favoris-soumettre' value='Ajouter à mes favoris' data-mini='true' /></form>"+
														"</div>"+
														"<br/>"+
														
														"<h2 class='infospratiques'>La note du lieu</h2>"+
														
														"<!--note & like-->"+
														"<div id='note_utilisateur'>"+	
														"<div id='moyennenote'></div>"+
														
														"<img src='img/flaticon-star.png' alt='' />A vous de noter :"+ 

														"<form>"+
															"<ul>"+
																"<li data-role='fieldcontain'>"+
																	"<select name='manote' id='note' data-mini='true' data-native-menu='false' data-icon='bouton_b'>"+
																		"<option value='1'>1</option>"+
																		"<option value='2'>2</option>"+
																		"<option value='3'>3</option>"+
																		"<option value='4'>4</option>"+
																		"<option value='5'>5</option>"+
																	"</select>"+
																	"<div id='hidden-id-lieu-note'></div>"+
																	
																	"<p class='button'>"+
																		"<input type='submit' name='add_note' value='Ajouter' data-mini='true'/>"+
																	"</p>"+
															
																"</li>"+
																"<!--moyenne note-->"+
															"</ul>"+
														
														"</form>"+
													"</div><!-- /note & like-->"+
														
													"<br/>"+
													"<!--galerie photo-->"+
													
													"<br/>"+
													"<!--frequenté par-->"+
													"<div id='lieu_frequente_par' class='fondbeige rose alinea'>"+
														"<h3 class='bold infospratiques'>Ils y sont allés :</h3>"+
														"<img src='img/lieux/perso-icon.png' alt='' />"+
														
														"<div id='persfreqlieu'>"+
															"<ul  data-role='controlgroup' data-mini='true'>"+
															"</ul>"+
														"</div>"+
														
													"</div><!-- fréquenté par -->"+
													"<!-- bouton je veux y aller -->"+	
													"<div class='boutoncarte'>"+

													"<h3 class='bold infospratiques'>Le lieu sur la carte</h3>"+
													"<p class='button'>"+
														"<img class='carte-icon' src='img/flaticon-map.png' alt='' /><input type='button' name='see_map' value='Je veux y aller' data-mini='true'/>"+
													"</p>"+
												"<br/>"+
												"</div>"+

												"<br/>"+

												"<!-- commentaire-->"+
												"<div id='zone_commentaire' class='fondblanc'>"+
													"<h3 class='infospratiques'>Commentaires</h3>"+
													"<img class='com-icon' src='img/flaticon-com.png' alt='' />"+

													"<form id='add-com'>"+
														"<p class='infocom'></p>"+

														"<!-- pseudo -->"+
														"<label for='pseudo' class='ui-hidden-accessible'>Pseudo</label>"+
														"<input type='text' name='pseudo' id='pseudo' placeholder='Pseudo' data-mini='true'/>"+

														"<!--Titre commentaire DONE BDD--> "+
														"<label for='titre_com' class='ui-hidden-accessible'>Titre</label>"+
														"<input type='text' name='titre_com' id='titre_com' placeholder='Titre' data-mini='true'/>"+

														"<!--Commentaire DONE BDD-->"+
														"<label for='commentaire' class='ui-hidden-accessible'>Commentaire</label>"+
														"<textarea name='commentaire' id='commentaire' data-mini='true' placeholder='Laisser un commentaire'></textarea>"+
														
														"<div id='hidden-id-lieu'></div>"+
														
														"<!-- bouton Commenter-->"+
														"<p class='button'>"+
															"<input type='submit' name='send_comment' id='bouton_commenter' value='Commenter' data-mini='true' />"+
														"</p>"+
													"</form>"+
														
													"<!-- liste des commentaires user -->"+	
													"<div id='zone_com_utilisateur'>"+
														"<p class='nb-commentaires'></p>"+
														"<h4></h4>"+
														"<ul class='com_utilisateur'>"+
														"</ul>"+
														
													"</div><!-- /liste des commentaires user -->"+
												"</div><!-- /commentaire-->");
												$("#ul_liste_lieuxtype li ul li div #contenu-fiche-t").addClass("positionleft");
												 //ici aussi pour recharger jQuery mobile styles :
												$("#ul_liste_lieuxtype li ul li div #contenu-fiche-t").trigger('create');
												
												$.each(data, function(i, item) {
												
													//on récupère les informations dynamiques relatives aux lieux
													var idlieubdd = item.idlieu; 
													var nom_lieu = item.nom_lieu; 
													var banniere = item.banniere_lieu;
													var annee_construction = item.annee_construction;
													var adresse = item.adresse; 
													var site_web = item.site_web; 
													var telephone = item.telephone; 
													
													var metro = item.metro;
													var description = item.description; 
													var id_lieu_com = item.id_lieu_com; 
													var idperso = item.idperso;
													var prenom = item.prenom;
													var nom = item.nom;
													var arrondissement = item.arrondissement_paris;
													
														//On affiche les informations dynamiques aux endroits voulus :
														// Afficher la banniere du lieu
														$('#banniere_lieu').html("<img src='" +banniere+ "' alt='' />");
														
														$('.lieu-arrondissement').html(arrondissement+" arrondissement");
														
														// Afficher l'année de construction du lieu
														$('.annee_construction').html(annee_construction);
														
														// Afficher l'adresse du lieu
														$('.adresse').html(adresse);
													
														// Afficher le site web du lieu
														$('.site_web').html("<a href='"+site_web+"'>"+site_web+"</a>");
													
													
														// Afficher le numéro de téléphone du lieu
														$('.telephone').html("0"+telephone);
														
														// Afficher le métro
														$('.metro').html(metro);
													
														$('#descrip_lieu').html(description);
											
														$('#hidden-id-lieu').html("<input type='hidden' name='id_lieu_com' value='"+idlieubdd+"' />");
														
														// Afficher les personnages ayant fréquenté le lieu
														$('#contenu-fiche-t #persfreqlieu ul').append(" - "+prenom+" "+nom);
														
														//L'id du lieu pour notes
														$('#hidden-id-lieu-note').html("<input type='hidden' name='id_lieu_note' value='"+idlieubdd+"' />");
														
														//Pour l'id du lieu pour favoris
														$("#hidden-favoris").html("<input type='hidden' name='favorislieu' value='"+idlieubdd+"' />");
															
														 //ici aussi pour recharger jQuery mobile styles :
													$("#ul_liste_lieuxtype li ul li div #contenu-fiche-t").trigger('create');

												});
												
												// POUR LE TYPE DE LIEU :
												$.ajax({
													type: "GET",
													dataType: 'jsonp',
													url: 'http://www.argosapps.fr/retro_php_server/type-lieu-fiche.php?callback=?',
													data: ({'idlieu' : idlieu}), 
													success: function(data){
													
														console.log('Succès type fiche lieu !');
														$.each(data, function(i, item) {
															$("#contenu-fiche-t .type-lieu-zone").append("<img src='"+item.icone_type_lieu+"' alt='' />"+item.type_lieu);
															$("#contenu-fiche-t").trigger('create');
														});
													},
													error: function(data) {
														$("#contenu-fiche-t .type-lieu-zone").append('<li>Problème de connexion ? Veuillez vérifier votre connexion au réseau');
													}
												});
												
												//Ajouter le lieu aux favoris
												$('#favoris-form').submit(function(){
												
													var postDatafav = $(this).serialize();
															$.ajax({
																	type: 'POST',	
																	data: postDatafav,
																	url: 'http://www.argosapps.fr/retro_php_server/ajouter-lieu-favoris.php',
																	success: function(data){
																			//do your thing
																			console.log('Favoris succès !');
																			alert(data);

																	},
																	error: function(){
																			//do your thing
																			console.log('Erreur favoris');
																	}
															});

															return false;
															
													});
												
												
												// ************************************** POUR LES COMMENTAIRES ******************************************************* //
									function loadComs() {
										var coms = $('#contenu-fiche-t #zone_com_utilisateur ul');
										
										$.ajax({
											type: 'GET',
											dataType: 'jsonp',
											url: 'http://www.argosapps.fr/retro_php_server/coms.php?&jsoncallback=?', //jsoncallback très important sinon requête ne va pas marcher
											data: ({'idlieu' : idlieu}), //on passe la variable en data pour la récupérer en PHP par $_GET['idlieu']
											timeout: 8000,
											success: function(data) {
												
												moment.lang('fr'); //format de langue, ici français
												
												var nbcoms = 0;
												$.each(data, function(i,item){
													//durée entre la date de publication et l'instant présent
													var datemoment = moment(item.datefr,"DD-MM-YYYY HH:mm").fromNow();
													coms.append('<li class="rose bold nom_user barre-haut"><img src="img/lieux/user-com.png" alt="" />'+item.pseudo+'</li>');
													coms.append('<li class="titre">« '+item.titre_com+' »</li>');
													coms.append('<li class="rose date">'+datemoment+'</li>');
													coms.append('<li class="barre-bas">'+item.commentaire+'</li><br/>');
													//pour compter le nombre de commentaires
													 nbcoms = nbcoms + 1;
													
													
												});
												
												//S'il y a 1 ou 0 commentaire, on affichera "commentaire", sinon, on affichera "commentaires"
													if (nbcoms <= 1) { var com ='commentaire';} else { com = 'commentaires';}
													$("#contenu-fiche-t #zone_com_utilisateur .nb-commentaires").append("Il y a "+nbcoms+" "+com);
													
													//S'il n'y a pas de commentaires, on affiche "Soit le 1er à commenter !"
													if (nbcoms == 0) {
														$(".infocom").append("Soit le 1er à commenter !");
													
													//Sinon on affiche "Les Rétro utilisateurs ont dit :"
													} else {
														$("#contenu-fiche-t #zone_com_utilisateur h4").append("Les Rétro utilisateurs ont dit :");
													
													}
													
											},
											error: function(data) {
												coms.append('<li>Impossible de charger les commentaires. Veuillez vérifier votre connexion réseau');
												
											}
										});
									}
									
									//$('#bouton_commenter').trigger('create');
									
									// ********* Ajouter un commentaire **************
									$('#zone_commentaire form').submit(function(){
								
												// je récupère les valeurs
										var pseudo = $('#pseudo').val();
										var titre_com = $('#titre_com').val();
										var comment_lieu = $('#commentaire').val();
										var id_lieu_com = $('#hidden-id-lieu').val();
										alert(pseudo+", vous allez poster : "+"Titre : "+titre_com+", Commentaire : "+comment_lieu+" "+id_lieu_com);
								 
										// je vérifie une première fois pour ne pas lancer la requête HTTP
										// si je sais que mon PHP renverra une erreur
										if(pseudo == '' || titre_com == '' || comment_lieu == '' ) {
											alert('Veillez à ce que tous les champs soient remplis!');
											pseudo.remove();
											titre_com.remove();
											comment_lieu.remove();
										} else {
									
												var postDatacom = $(this).serialize();

												$.ajax({
														type: 'POST',
														data: postDatacom,
														url: 'http://www.argosapps.fr/retro_php_server/add-com.php',
														success: function(data){
																//do your thing
																console.log('Commentaire ajoute!');
																alert('Votre commentaire a bien été enregistré !'); // j'affiche cette réponse
														},
														error: function(){
																//do your thing
																console.log('Erreur dans lenvoie du commentaire');
																

														}
												});

												return false;
											}
										});
										
										
										// ***************** fin ajout commentaire ************
										
										
										loadComs();

									
									// ************************************** POUR LES COMMENTAIRES ******************************************************* //
									
									
										//Ajouter ma note
										//En POST pour entrer la note dans la base :
										$('#note_utilisateur form').submit(function(){
													var displaynote = $('#note').val();
													alert("Vous avez attribué la note de "+displaynote+". Merci d'avoir partagé votre avis !");

													if(displaynote == '') {
													displaynote.remove();
													  } else {
													  
													   var postDatamark = $(this).serialize();
													$.ajax({
															type: 'POST',
															data: postDatamark,
															url: 'http://www.argosapps.fr/retro_php_server/addmark.php',
															success: function(data){
																	//do your thing
																	console.log('Note ajoutée !');
																	alert('Votre note a bien été enregistrée !'); // j'affiche cette réponse

															},
															error: function(){
																	//do your thing
																	console.log('Erreur ajout note');
															}
													});

													return false;
													}
											});
									
									
									
									// ************************* MOYENNE NOTE LIEU ***********************//
									
									//La note du lieu (moyenne)
									function loadMarkavg() {
									var markavg = $('#contenu-fiche-t #moyennenote');
									$.ajax({
										type: 'GET',
										dataType: 'JSONp',
										url: 'http://www.argosapps.fr/retro_php_server/avgnote.php?&jsoncallback=?',
										data: ({'idlieu' : idlieu}), //on passe la variable en data pour la récupérer en PHP par $_GET['idlieu']
										timeout: 8000,
										success: function(data) {
											$.each(data, function(i,item){
												if(item.avgnote == null) {
													markavg.append("Soit le 1er à noter !");
													
												} else {
													markavg.append(item.avgnote+'/5');
												}
											});
											
											
											},
										error: function(data) {
											markavg.append('<li>Impossible de charger la moyenne des notes. Veuillez vérifier votre connexion réseau');
											
										}
										
										
									});
								}
								loadMarkavg(); //à mettre obligatoirement	
						
									
									// ********************************* //
									
									
									// ************************************** POUR LES NOTES ******************************************************* //
									//test avec les notes
									function loadMark() {
										var mark = $('#contenu-fiche-t #note_utilisateur form ul');
										
										$.ajax({
											type: 'GET',
											dataType: 'JSONp',
											url: 'http://www.argosapps.fr/retro_php_server/marks.php?&jsoncallback=?',
											data: ({'idlieu' : idlieu}), //on passe la variable en data pour la récupérer en PHP par $_GET['idlieu']
											timeout: 8000,
											success: function(data) {
											
												$.each(data, function(i,item){
													if(item.note == undefined) {
														mark.append("<li class='manote'>Ce lieu n'a pas encore de note !</li>");
													} else {
														mark.append('<li class="manote">'+'La dernière note : '+item.note+'/5</li>');
													}
												});
															
												
												},
											error: function(data) {
												mark.append('<li>Impossible de charger les notes. Veuillez vérifier votre connexion réseau');
												
											}
											
										});
									}
									
									loadMark();
									
									
									// ******************************** POUR LES NOTES *******************************//
												
												
												
												
												
											},
														error: function(){
															//do your thing
															console.log('Impossible dafficher les infos sur les personnages selon le type choisi ! Veuillez vérifier votre connexion réseau');
														}
													});
														
														
														return false;
								
								// ******************************************************************************************* //
														
										});
		
								
									

								},
								error: function(){
									//do your thing
									console.log('so sad!');
								}
								});
								
								
								return false;
								
							}//fin else
						});
						
					
				},
			error: function(data) {
				ListeLieuxType.append('<li>Impossible de charger les types de lieux. Veuillez vérifier votre connexion réseau');
				
			}
			
			
		});
	
		
		
	}
	

	
	loadListeLieuxType(); //à mettre obligatoirement
	

	