class Food{

    constructor()
    {

        this.image = loadImage("images/Food Stock.png");
        this.foodStock = 0;
        this.lastFed;

    }

    //getFoodStock()
    updateFoodStock(foodStock)
    {

        this.foodStock = foodStock;
    }

    getFeedTime(lastFed)
    {

       this.lastFed = lastFed;
    }

    deductFood()
    {

        if(this.foodStock > 0)
        {
            this.foodStock = this.foodStock-1;

        }
    }

    bedroom()
    {
      background(bedroom, 550, 550);
    }

    washroom()
    {
      background(washroom, 550, 550);
    }

    garden()
    {
      background(garden, 550, 550);
      
    }


    getFoodStock()
    {

        return this.foodStock;
    }


    display()
    {
        var x= 80, y= 100;

        imageMode(CENTER);
 

        if (this.foodStock!==0)
        {
            for(var i=0; i<this.foodStock;i++)
            {
                if(i%7===0)
                {
                    x=80;
                    y=y+50;
                }

                image(this.image, x, y, 50, 50);
                x = x+50;
            }
        }
    }
}