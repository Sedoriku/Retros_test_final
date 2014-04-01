// Code qui affiche : 
// - les résultats de recherche de personnages d'après un mot clé saisi par un utilisateur
// - le nombre de résultats retournés

	//masquer la partie "résultat de la recherche")
	$('.resultat-titre').hide();
	$('.contenu_recherche').hide();
	$('#ul_liste_persoAZ').show();
	$('ul_liste_persotype').show();
	
	//Quand on clique sur "De A à Z", on affiche la liste des personnages de A à Z et on masque le résultat de recherche
	$('#li_a_z').click(function() {
		$('#ul_liste_persoAZ').show();
		$('.resultat-titre').hide();
		$('.contenu_recherche').hide();
		$('.nb-resultats').hide();
	});
	
	
	//Quand on clique sur "Par type", on affiche la liste des types de personnages et on masque le résultat de recherche
	$('#li_types_perso').click(function() {
		$('#ul_liste_persotype').show();
		$('.resultat-titre').hide();
		$('.contenu_recherche').hide();
		$('.nb-resultats').hide();
	});
	
	
	$('#search-bar').submit(function(){
		//on affiche le titre "Résultat recherche"
		$('.resultat-titre').show();
		$('.nb-resultats').show();
		$('.resultat-titre').html("Résultat recherche");
		$('.contenu_recherche ul').html("Les Rétro Personnages : ");
		
	
		        // je récupère les valeurs
        var searchkey = $('#searchkey').val();
		//alert("Vous allez chercher : "+searchkey);
 
        // je vérifie que le champ n'est pas vide
        if(searchkey == '') {
            alert('Saisissez un mot clé !');
			searchkey.remove();
        } else {
	
                var postSearch = $(this).serialize();

                $.ajax({
                        type: 'GET',
						dataType: 'jsonp',
                        data: postSearch,
                        url: 'http://www.argosapps.fr/retro_php_server/cherche-perso.php?callback=?',
                        success: function(data){
                                //do your thing
                                console.log('Recherche perso ok !');
								
								//on cache toutes les autres listes de la page :
								$('#ul_liste_persoAZ').hide();
								$('#ul_liste_persotype').hide();
								
									$('.contenu_recherche').show();
														
									$.each(data, function(i, item) {
										
										//alert(item.prenom+" "+item.nom);
										//on affiche le nom et le prénom sous forme de liste suite à la recherche
										$('.contenu_recherche ul').append('<li><a id="'+item.id+'" href="#" rel="external"><img src="'+item.icone_perso+'" alt=""/>'+item.nom+' '+item.prenom+'</a></li><div id="fiche-perso-'+item.id+'"></div>');
										$('#recherche-resultat ul').listview('refresh');
						
										
									});
									
									var nbresults = $('.contenu_recherche ul li').length;
									//alert(nbresults);
									$('.nb-resultats').html(nbresults+" Rétro personnage(s) pour votre recherche !");
									
									//afficher les fiches selon le personnage issus de la recherche, qu'on a chosii :
									
				//au clic sur un des personnages de la recherche, on va récupérer les infos de ces personnages
				 $('.contenu_recherche ul li a').click(function(e) {
				
					//on va masquer tous les div au départ(contenant les fiches persos)
					$('.contenu_recherche ul div').hide();
				
							//on récupère la valeur de l'id du lien sur lequel l'utilisateur a cliqué, et on la stocke dans la variable idperso
							var idperso = $(this).attr('id');

						$.ajax({
								type: "GET",
								dataType: 'jsonp',
								url: 'http://www.argosapps.fr/retro_php_server/fiche-perso-selon-perso-liste.php?callback=?',
								data: ({'idperso' : idperso}), //on passe la variable en data pour la récupérer en PHP par $_GET['idperso']
								success: function(data){
								
									console.log('Succès fiche perso !');
									console.log(data); //on récupère bien les infos sur le personnage choisi
									$.each(data, function(i, item) {
									
									//On prépare
									var $divperso = '#fiche-perso-' + idperso;
									//alert($divperso);
									$($divperso).show();
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
											"<p id='origine' class='small-font'></p>"+
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
										"<p id='savie-txt'></p>"+
										"<h4 class='perso-paris'>Lui et Paris !</h4>"+
										"<p id='perso-paris-txt'></p>"+
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
										"<h3><span class='bold'>Les Rétro-lieux fréquentés :</span></h3>"+
										"<img src='img/direction-icone.png' alt='' />"+
											"<ul data-role='controlgroup' data-mini='true'>"+
											"</ul>"+
										"</div><!-- /Lieu fréquenté -->"+

										"</div><!-- /content -->");
									
										var prenom = item.prenom; 
										var nom = item.nom; 
										var description = item.description; 
										var datenaiss = item.date_naiss;
										var datemort = item.date_mort;
										var origine = item.origine;
										var description = item.description;
										var descriptionbis = item.descriptionbis;
										var photoperso = item.photo_perso;
										var aimeun = item.aime_un;
										var aimedeux = item.aime_deux;
										var aimetrois = item.aime_trois;
										var nom_oeuvre_un = item.nom_oeuvre_un;
										var nom_oeuvre_deux = item.nom_oeuvre_deux;
										var lien_oeuvre_un = item.lien_oeuvre_un;
										var lien_oeuvre_deux = item.lien_oeuvre_deux;
										var lieufreq = item.nom_lieu;
										
										
											//icone personnage 
											$('.photo-perso-zone').html('<img src="'+item.icone_perso+'" alt=""/>');
											
											//dates
											$('.dates').html(datenaiss+" - " +datemort);
											
											//origine
											$('#origine').html("Origine : "+origine);
											
											
											
											//aime/centres d'intérêt
											$('#perso-aime ul').html('<li>'+aimeun+'</li><li>'+aimedeux+'</li><li>'+aimetrois+'</li>');
											
											//oeuvres
											$('.detail-oeuvres').html("<li><a href='"+lien_oeuvre_un+"'>"+nom_oeuvre_un+"</a></li><li><a href='"+lien_oeuvre_deux+"'>"+nom_oeuvre_deux+"</a></li>");
											
											//lieu fréq
											$('.lieu_frequente ul').append('<li>'+lieufreq+'</li>');
										
											//description sa vie
											$('#savie-txt').html(description);
											
											//description perso & Paris
											$('#perso-paris-txt').html(descriptionbis);
										
							
										
									});
									
									
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
												console.log('Echec type perso');
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
												console.log('Echec epoque perso');
											}
									});
									
									//*************on affiche les infos sur le personnage***********//
									

								},
								error: function(){
									//do your thing
									console.log('Echec !');
								}
								});
								
								
								return false;
									
							
						});
									
		
							
                        },
                        error: function(){
                                //do your thing
                                console.log('Erreur dans la recherche du personnage...');
								

                        }
                });

                return false;
			}
        });