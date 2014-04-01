// Code qui permet : 
// - l'inscription de l'utilisateur (avec vérification si le login est déjà pris ou non grâce au fichier PHP, et cryptage du mot de passe lors de l'inscription)

$(function(){

// --------------------- INSCRIPTION --------------------------

	function loadInscription() {
	
	$('form').submit(function(){
	
	    // je récupère les valeurs saisies par l'utilisateur
        var inscrip_login = $('#inscrip_login').val();
        var inscrip_mdp = $('#inscrip_mdp').val();
        var confirme_inscrip_mdp = $('#confirme_inscrip_mdp').val();
		var inscrip_mail = $('#inscrip_mail').val();
		var inscrip_photo = $('#inscrip_photo').val();
		alert("Vous allez vous inscrire avec pour login "+inscrip_login+" et avec l'adresse mail "+inscrip_mail);
 
        // je vérifie qu'aucun champ ne soit vide, pour ne pas lancer l'appel ajax pour rien
        if(inscrip_login == '' || inscrip_mdp == '' || confirme_inscrip_mdp == '' || inscrip_mail == '' ) {
            alert('Veillez à ce que tous les champs soient remplis !');
			inscrip_login.remove(); //on efface ensuite ces infos pour ne pas garder ces infos, et pour assurer les autres passages dans ce test
			inscrip_mdp.remove();
			confirme_inscrip_mdp.remove();
			inscrip_mail.remove();
			inscrip_photo.remove();
			//et on n'inscris donc pas l'utilisateur (pas d'appel ajax ici donc)
		//Sinon, (si tous les champs sont remplis), on va faire l'appel ajax qui va permettre d'enregistrer les infos de l'utilisateur dans la base de données et donc d'inscrire l'utilisateur
        } else {
	
	
                var postDatauser = $(this).serialize();
				//Appel Ajax en GET pour inscrire l'utilisateur (grâce au fichier PHP addutilisateur.php) : 
                $.ajax({
                        type: 'GET',
                        data: postDatauser,
                        url: 'http://www.argosapps.fr/retro_php_server/addutilisateur.php',
                        success: function(data){
						
							//data permet d'afficher le résultat retourné par le fichier PHP > pseudo pris ou pseudo libre 
							alert("Le pseudo est "+data);
							
                                console.log('Inscription réussie !');
								

                        },
                        error: function(){
                                console.log('Il y a eu une erreur durant votre inscription');
                        }
                });

                return false;
			}
        });
		
		
		}
	
		loadInscription();
		
			
	});
