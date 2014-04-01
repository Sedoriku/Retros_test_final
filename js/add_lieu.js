//Vode qui permet :
// - la récupération d'une proposition de lieu
// - vérification des champs requis 
//	+ relie au fichier php pour ajouter le lieu dans la base de donnée et envoyer un mail pour avertir d'une nouvelle proposition de lieu
//	+ alerte afin d'améliorer l'expérience utilisateur 

	$('form').submit(function(){
		//récupération des valeurs
		var nomLieu = $('#form_name').val();
		var typeLieu = $('#form_lieu').val();
		var nrueLieu = $('#form_rue').val();
		var arrLieu = $('#form_arr').val();
		var telLieu = $('#form_tel').val();
		var siteLieu = $('#form_url').val();
		var descripLieu = $('#form_description').val();
		var srcLieu = $('#form_source').val();
		var lieuFreqBy = $('#form_frequente_par').val();
		var noteLieu = $('#form_note').val();
		var comLieu = $('#form_commentaire').val();
	
			//vérification des champs requis, pour ne pas lancer la requête HTTP	
			if(nomLieu == '' || typeLieu == '' ||nrueLieu == '' || arrLieu == '' ||descripLieu == '' || srcLieu == '' ||lieuFreqBy == '' || noteLieu == '' || comLieu =='') {
				alert('Veillez remplir tous les champs requis!');
				
							
			} else {
			   var postDatalieu = $(this).serialize();
				
				$.ajax({
					type: 'POST',
					data: postDatalieu,
					url: 'http://www.argosapps.fr/retro_php_server/add_lieu.php',
					success: function(data){
						//do your thing
						console.log('Lieu ajouté!');
						alert('Votre proposition de lieu a bien été enregistrée ! Nous allons chercher plus d\'information sur '+nomLieu+' Merci d\'avoir partagé'); 
						
					},
					error: function(){
						//do your thing
						console.log('Erreur, le lieu n\'a pas été ajouté !');
					}
				});
			return false;
			}
    });