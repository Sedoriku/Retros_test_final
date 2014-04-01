// Code qui permet : 
// - la déconnexion de l'utilisateur

 $('#deconnexion-bouton').submit(function(){	
				// appel ajax vers le fichier PHP qui se charge de la déconnexion (destruction de la variable de session - login de l'utilisateur)
				$.ajax({
                        type: 'GET',
						//dataType: 'jsonp',
                        url: 'http://www.argosapps.fr/retro_php_server/deconnexion.php?jsoncallback=?',
                        success: function(data){
							
								alert("Vous êtes déconnecté");
                                console.log('Déconnexion réussie !');
								

                        },
                        error: function(){

                                console.log('Il y a eu une erreur durant votre déconnexion');
                        }
                });
				
});