$(function(){

// --------------------- INSCRIPTION --------------------------

	function submitPicture() {
	
	//En GET pour entrer les données utilisateur dans la table retro_utilisateur
	$('form').submit(function(){
	
	    // je récupère les valeurs saisies par l'utilisateur
        var photo_post = $('#photo_post').val();
       
		alert("Souhaitez-vous partager cette photo avec la rétro-communauté ?");
 
        // je vérifie qu'aucun champ ne soit vide, pour ne pas lancer l'appel ajax pour rien
	
	
                var postDatauser = $(this).serialize();
				//Appel Ajax en GET : 
                $.ajax({
                        type: 'POST',
                        data: postDatauser,
                        url: 'http://www.argosapps.fr/retro_php_server/traite-galerie.php',
                        success: function(data){
						
							//$("#resultat").html("<p>Vous avez été connecté avec succès !</p>");
								alert("Photo postée ! Merci cher rétro-utilisateur !");
							
				
						

                        },
                        error: function(){
                                console.log('Il y a eu une erreur durant le chargement de votre photographie');
                        }
                });

                return false;
			}
        });
		
		
		}
	
		submitPicture();
		
			
	});
