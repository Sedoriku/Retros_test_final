// Code qui permet : 
// - la d�connexion de l'utilisateur

 $('#deconnexion-bouton').submit(function(){	
				// appel ajax vers le fichier PHP qui se charge de la d�connexion (destruction de la variable de session - login de l'utilisateur)
				$.ajax({
                        type: 'GET',
						//dataType: 'jsonp',
                        url: 'http://www.argosapps.fr/retro_php_server/deconnexion.php?jsoncallback=?',
                        success: function(data){
							
								alert("Vous �tes d�connect�");
                                console.log('D�connexion r�ussie !');
								

                        },
                        error: function(){

                                console.log('Il y a eu une erreur durant votre d�connexion');
                        }
                });
				
});