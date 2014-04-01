// Code qui permet : 
// - la connexion de l'utilisateur 

$(function(){

	function loadProcessCon() {
	
		$('#connexion-form').submit(function(){
	
			// je récupère les valeurs saisies
			var con_login = $('#con_login').val();
			var con_mdp = $('#con_mdp').val();

	 
			// je vérifie que les champs ne sont pas vides
			if(con_login == '' || con_mdp == '') {
				alert('Veillez à ce que tous les champs soient remplis !');
				con_login.remove();
				con_mdp.remove();
			
			} else {
				
					var postDatacon = $(this).serialize();
					var verifcon = $('#verifcon');

					//Appel Ajax pour appeler le fichier PHP qui va se charger de la connexion (en vérifiant le login, mdp...)
					$.ajax({
							type: 'POST',
							data: postDatacon,
							url: 'http://www.argosapps.fr/retro_php_server/process-conn.php',
							success: function(data){
								
								//data permet d'afficher ce que le php renvoie en echo : si l'utilisateur est connecté, ou s'il ne l'est pas
								alert(data);
							
								console.log('Connexion réussie !');
							

							},
							error: function(){
									//do your thing
									console.log('Il y a eu une erreur durant votre connexion');
							}
					});
					
					

					return false;
				}
        });
		
		
		}
	
		loadProcessCon();
		
			
});
