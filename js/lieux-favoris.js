// Code qui affiche : 
// - les lieux favoris d'un utilisateur lorsqu'il est connecté

									function loadfavoris() {
									$.ajax({
										type: 'GET',
										dataType: 'JSONp',
										url: 'http://www.argosapps.fr/retro_php_server/lieux-favoris.php?&jsoncallback=?',
										success: function(data) {
											$.each(data, function(i,item){
												//on affiche sous forme de liste le nom et l'image des lieux favoris de l'utilisateur
												$("#lieux-favoris-zone ul").append("<li>"+item.nom_lieu+"<br/><img src='"+item.banniere_lieu+"' alt='' /></li>");
											
											});
											
											
											},
										error: function(data) {
											$("#lieux-favoris-zone ul").append('<li>Problème pour afficher vos lieux favoris : vérifiez votre connexion réseau');
											
										}
										
										
									});
								}
								loadfavoris(); //à mettre obligatoirement