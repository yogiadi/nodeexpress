var lis=document.querySelectorAll(".thumbnail");

for (var i=0;i<lis.length;i++){
    lis[i].addEventListener("mouseover",function(){
        this.classList.add("btn-info");
    });
    lis[i].addEventListener("mouseout",function(){
		this.classList.remove("btn-info");	
	});
}

