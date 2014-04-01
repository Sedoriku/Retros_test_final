// Code qui affiche : 
// - le login de l'utilisateur s'il est connecté (code lié à toutes les pages de l'application)
				
				$.ajax({
                        type: 'GET',
						//dataType: 'jsonp',
                        url: 'http://www.argosapps.fr/retro_php_server/session-conn.php?jsoncallback=?',
                        success: function(data){
								//Si l'utilisateur est connecté (variable de session), on affiche le login
								if (data!=="") {
									$("#con-zone").append('<img src="img/utilisateur-icone.png" alt="" /><p id="login-connexion">'+data+'</p>');
									$("#con-zone").addClass("connexion-reussie");
								}
								
                                console.log('Connexion réussie !');
								

                        },
                        error: function(){
                                //do your thing
                                console.log('Il y a eu une erreur durant votre connexion');
                        }
                });