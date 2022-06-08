exports.getLogin=(req,res,next)=>{
    //console.log(req.get('Cookie').split(';')[1].trim().split('=')[1]);
    //const isLoggedIn=req.get('Cookie').split(';')[1].trim().split('=')[1]=='true';
    console.log(res.session);
    res.render('auth/login',{
        path:'/login',
        pageTitle:'Login',
        isAuthenticated:req.session.isLoggedIn
    });
}

exports.postLogin=(req,res,next)=>{
    req.session.isLoggedIn=true;
    //res.setHeader('Set-Cookie','LoggedIn=true');
    res.redirect('/login');
}