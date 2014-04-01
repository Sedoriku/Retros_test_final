// Code qui affiche : 
// - tous les personnages de A à Z
// - les fiches des personnages correspondant  (informations dynamiques, provenant de la BDD)

	//Pour afficher TOUTES les infos du lieux dynamiquement
	function loadListePersosAZ() {
		var ListePersosAZ = $('#liste_persoAZ ul');
		//appel Ajax vers le fichier php liste-persosAZ.php qui retourne les personnages de A à Z
		$.ajax({
			type: 'GET',
			url: 'http://www.argosapps.fr/retro_php_server/liste-persosAZ.php?&jsoncallback=?',
			dataType: 'JSONp',
			timeout: 8000,
			success: function(data) {
				$.each(data, function(i,item){
					
					//affichage des personnages de A à Z sous forme de liste
					//la valeur de l'id du lien (a) correspond à l'id du personnage dans la table 
					ListePersosAZ.append('<li><a id="'+item.id+'" href="#" rel="external"><img src="'+item.icone_perso+'" alt=""/>'+item.nom+' '+item.prenom+'<img src="http://argosapps.fr/retro-appli-accordeon-fiches/img/arrow_down.png" alt="icone flèche" class="arrow_icon"/></a></li><div id="fiche-perso-'+item.id+'"></div>');
					$('#ul_liste_persoAZ').listview('refresh');	//rafraîchir les styles JQM		
				});
				
																		
				//au clic sur un des personnages, on va récupérer les lieux qui correspondent à ce personnage
				 $('#ul_liste_persoAZ li a').click(function(e) {
					
					if ( $(this).hasClass("opened") == true) {
						$('#ul_liste_persoAZ div').hide();
						$('#ul_liste_persoAZ li a').removeClass("opened");
						$(".arrow_icon").attr("src","http://argosapps.fr/retro-appli-accordeon-fiches/img/arrow_down.png");
					} else {
						$('#ul_liste_lieuxtype li a').removeClass("opened");
						$(this).addClass("opened");
						$(".arrow_icon").attr("src","http://argosapps.fr/retro-appli-accordeon-fiches/img/arrow_down.png");
						$(".opened .arrow_icon").attr("src","http://argosapps.fr/retro-appli-accordeon-fiches/img/arrow_up.png");
					//on va masquer tous les div au départ(contenant les fiches persos)
					$('#ul_liste_persoAZ div').hide();
				
							//on récupère la valeur de l'id du lien sur lequel l'utilisateur a cliqué, et on la stocke dans la variable idperso
							var idperso = $(this).attr('id');

						$.ajax({
								type: "GET",
								dataType: 'jsonp',
								url: 'http://www.argosapps.fr/retro_php_server/fiche-perso-selon-perso-liste.php?callback=?',
								data: ({'idperso' : idperso}), //on passe la variable en data pour la récupérer en PHP par $_GET['idperso']
								success: function(data){
								
										//On prépare la fiche perso en question
										var $divperso = '#fiche-perso-' + idperso;
													
										//on affiche la fiche du personnage correspondant à celui cliqué
										$($divperso).show();
													
													
													//on construit la fiche qui va contenir du code html :
													$($divperso).html("<div data-role='content'>"+

													"<!--photo + date-->"+	
														"<div id='info'>"+
															"<div class='photo-perso-zone'>"+
															"<!-- ici icone_perso -->"+
															"</div>"+
															"<div class='type-perso-zone'>"+
																"<!-- type ici du perso et icone -->"+
															"</div>"+
															"<p>Ses dates :</p> "+
															"<p class='small-font dates'></p><!--A CHANGER SELON LE NOM-->"+
															"<p class='origine' class='small-font'></p>"+
															
														"</div>"+
														
														"<div id='perso-aime'>"+
															"<img src='img/icone-coeur.png' alt='' />"+
															"<ul>"+
																"<!--<li>l'engagement</li>"+
																"<li>les combats moraux</li>"+
																"<li>l'humanisme</li>-->"+
															"</ul>"+
														"</div>"+
														

														"<div id='description-zone'>"+
														"<h3 class='small-font'>Rétrospective sur son histoire !</h3>"+
														"<div class='epoque-zone'>"+
															"<p>Il a vécu à l'époque :</p>"+
															"<p class='epoque-perso'></p>"+
														"</div>"+
													"<!--biographie-->	<!--A CHANGER SELON LE NOM-->"+
														"<div id='biographie'>"+
														"<h4 class='vie'>Sa vie</h4>"+
														"<p class='savie-txt'></p>"+
														"<h4 class='perso-paris'>Lui et Paris !</h4>"+
														"<p class='perso-paris-txt'></p>"+
														"</div><!-- /bio-->"+
														"</div>"+
														
													"<br />"+
													"<!--Oeuvres-->"+
														"<div id='oeuvres' class='rose'><h3><span class='bold'>Ses oeuvres</span></h3>"+
															"<img src='img/icone-cadis.png' class='icone' alt='' />"+
															"<ul><!--LI A CHANGER SELON BDD-->"+
															"<li id='amazon'><h4>Acheter sur Amazon</h4> <img src='img/perso/amazon.png' alt='' /></li>"+
																"<ul class='detail-oeuvres'>"+
																"<!--<li><a href='#'>L'Étranger (1942)</a></li>	"+
																"<li><a href='#'>La Peste (1947)</a></li>-->	"+
																"</ul>"+
															"</ul>"+
														"</div> <!-- /Oeuvres -->"+

													"<br/>"+

													"<!--Lieu fréquenté-->"+
														"<div class='lieu_frequente alinea'>"+
														"<p class='affichelieuxfreq'></p>"+
														"<h3><span class='bold'>Les Rétro-lieux fréquentés :</span></h3>"+
															"<img src='img/direction-icone.png' alt='' />"+
															"<ul data-role='controlgroup' data-mini='true'>"+
															"</ul>"+
														"</div><!-- /Lieu fréquenté -->"+

														"</div><!-- /content -->");
									
									console.log('Succès fiche perso !');
									console.log(data); //on récupère bien les infos sur le personnage choisi
						//***********on affiche les infos du type de personnage : ****************
									$.ajax({
											type: "GET",
											dataType: 'jsonp',
											url: 'http://www.argosapps.fr/retro_php_server/typeperso-selon-fiche.php?callback=?',
											data: ({'idperso' : idperso}), //on passe la variable en data pour la récupérer en PHP par $_GET['idperso']
											success: function(data){
												console.log('succes type perso!');
												$.each(data, function(i, item) {
													var typedupersonnage = item.type;
													var iconetypeperso = item.icone_type_personnage;
													$('.type-perso-zone').append("<img src='"+iconetypeperso+"' alt='' /><p class='type-perso'>"+typedupersonnage+"</p>");
												});
														
														
											},
											error: function(){
												console.log('Erreur type du personnage');
											}
									});
									
									//*************on affiche les infos sur le personnage***********//
									
									//***********on affiche les infos sur l'époque : ****************
									$.ajax({
											type: "GET",
											dataType: 'jsonp',
											url: 'http://www.argosapps.fr/retro_php_server/epoque-perso-fiche.php?callback=?',
											data: ({'idperso' : idperso}), //on passe la variable en data pour la récupérer en PHP par $_GET['idperso']
											success: function(data){
												console.log('succes époque perso!');
												$.each(data, function(i, item) {
													var epoqueperso = item.epoque;
													var debut_epoque = item.debut_epoque;
													var fin_epoque = item.fin_epoque;
													$('.epoque-perso').append(epoqueperso+" ("+debut_epoque+" - "+fin_epoque+")");
												});
														
														
											},
											error: function(){
												console.log('so sad!');
											}
									});
									
									//*************on affiche les infos sur le personnage***********//
									
									
										$.each(data, function(i, item) {
														
														//on récupère les infos sur les personnages en les stockant dans des variables
														var prenom = item.prenom; 
														var nom = item.nom; 
														var description = item.description; 
														var datenaiss = item.date_naiss;
														var datemort = item.date_mort;
														var origine = item.origine;
														var description = item.description;
														var descriptionbis = item.descriptionbis;
														var icone_perso = item.icone_perso;
														var aimeun = item.aime_un;
														var aimedeux = item.aime_deux;
														var aimetrois = item.aime_trois;
														var nom_oeuvre_un = item.nom_oeuvre_un;
														var nom_oeuvre_deux = item.nom_oeuvre_deux;
														var lien_oeuvre_un = item.lien_oeuvre_un;
														var lien_oeuvre_deux = item.lien_oeuvre_deux;
														var lieufreq = item.nom_lieu;
														
															//on affiche ces infos dynamiques aux endroits voulus :
															//icone personnage
															$('.photo-perso-zone').html('<img src="'+item.icone_perso+'" alt=""/>');
													
															
															//dates
															$('.dates').html(datenaiss+" - " +datemort);
															
															//origine
															$('.origine').html("Origine : "+origine);
														
													
															//aime/centres d'intérêt
															$('#perso-aime ul').html('<li>'+aimeun+'</li><li>'+aimedeux+'</li><li>'+aimetrois+'</li>');
															
															//oeuvres :
															$('.detail-oeuvres').html("<li><a href='"+lien_oeuvre_un+"'>"+nom_oeuvre_un+"</a></li><li><a href='"+lien_oeuvre_deux+"'>"+nom_oeuvre_deux+"</a></li>");
															
															
														
															//description sa vie
															$('.savie-txt').html(description);
															
															//description perso & Paris
															$('.perso-paris-txt').html(descriptionbis);
													
													
															//lieu fréq
															$('.lieu_frequente ul').append('<li>'+lieufreq+'</li>');
														
														
									});
									

								},
								error: function(){
									//do your thing
									console.log('Erreur');
								}
								});
								
									
								return false;
						
						
							} //fin du else
						});
				
				
				
				},
			error: function(data) {
				ListePersosAZ.append('<li>Impossible de charger les personnages. Veuillez vérifier votre connexion réseau !');
			}
			
			
		});
	}
	loadListePersosAZ(); //à mettre obligatoirement
	
	