$(function(){

// --------------------- INSCRIPTION --------------------------

	function submitPicture() {
	
	//En GET pour entrer les donn�es utilisateur dans la table retro_utilisateur
	$('form').submit(function(){
	
	    // je r�cup�re les valeurs saisies par l'utilisateur
        var photo_post = $('#photo_post').val();
       
		alert("Souhaitez-vous partager cette photo avec la r�tro-communaut� ?");
 
        // je v�rifie qu'aucun champ ne soit vide, pour ne pas lancer l'appel ajax pour rien
	
	
                var postDatauser = $(this).serialize();
				//Appel Ajax en GET : 
                $.ajax({
                        type: 'POST',
                        data: postDatauser,
                        url: 'http://www.argosapps.fr/retro_php_server/traite-galerie.php',
                        success: function(data){
						
							//$("#resultat").html("<p>Vous avez �t� connect� avec succ�s !</p>");
								alert("Photo post�e ! Merci cher r�tro-utilisateur !");
							
				
						

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
