var problemeVoiture =  [];

problemeVoiture.push(
{
	id:"capot_voiture",
	text:" un trou dans le capot de voiture " 
},
{
	id:"porte_gauche_conducteur_bas",
	text:" un trou dans le capot de voiture " 
}
);

var imageVoiture = document.querySelector("#voiture");

var paths = imageVoiture.querySelectorAll(".imageVoiture a");

// polyfill du foreach 

if(NodeList.prototype.forEach === undefined){
	NodeList.prototype.forEach = function(callback){
		[].foreach.call(this, callback);
	}

}

var afficherListProbleme = function(){
	var logProbleme = document.getElementById("logProbleme");
	logProbleme.innerHTML='';
	problemeVoiture.forEach(function(probleme){
		logProbleme.insertAdjacentHTML('beforeend','<div><b>id :</b> '+probleme.id+'</div> <div> <b>description</b> : '+probleme.text+'</div> <br>' );

	});
}

afficherListProbleme();

// afficher les probleme sur la voiture 
paths.forEach(function(path){
	problemeVoiture.forEach(function(probleme){
		if(probleme.id === path.id){			
			document.querySelector('#'+path.id).classList.add('problemeStyle');	
    		//document.getElementById("logProbleme").innerHTML = "<div> id : "+path.id+ "</div> ";
    		return ;	
    	}

    });

});

// ajouter deux action sur l'evenement mouseenter --> afficher un effet sur la zone pointer    et click --> changer le status de l'erreur
paths.forEach(function(path){
	path.addEventListener('mouseenter' , function(){
		//console.log('Status , mon path est:'+path.id );
	});

    // evenement click
	path.addEventListener("click" , function(){		
		var indexProbleme = 0 ;
		var existError = 0 ;
		problemeVoiture.forEach(	function(probleme){			
			if(probleme.id === path.id){
				existError = 1 ;
				console.warn('Status , mon path est:'+path.id );
				document.querySelector('#'+path.id).classList.remove('problemeStyle');	
				problemeVoiture.splice(indexProbleme, 1);	
				//delete problemeVoiture[indexProbleme];				
				return ;	
			}else{				
			}
			indexProbleme++ ; 
		});

		if(existError===0){
			problemeVoiture.push(
				{
					id:path.id,
					text:" nouveauuuuuuuuuuuuu " 
				});
				document.querySelector('#'+path.id).classList.add('problemeStyle');

		}
			

		afficherListProbleme();
	});

});
