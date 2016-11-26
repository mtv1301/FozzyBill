/**Created by Tetiana on 19.11.2016.*/
$(document).ready(function () {
    $("#addProductBtn").click(function () {
        someFunc();
        $("#createBill").show();
        $("#removeAll").show();
    });
    function someFunc() {
        var delContainer = $("<div class='form-inline delContainer'></div>");
        var productNameContainer = $("<div class='form-group'> " +
            "<label class='sr-only'>Product</label>" +
            "<span class='form-product'>Product name</span>" +
            "<input type='text' class='form-control productName' placeholder='Enter product'>" +
            "</div>");
        var priceContainer = $("<div class='form-group'>" +
            "<span class='form-product'>Price</span><label class='sr-only'>Price</label>" +
            "</div>");
        var priceInput =$("<input type='number' class='form-control price' placeholder='Price'>");
        var button = $("<button type='button' class='btn btn-danger removeBtn'>Remove</button>");
        $(priceInput).blur(function () {
            var value= parseFloat($(this).val());
            $(this).val(value.toFixed(2));
        });
        $(button).click(function () {
            $(this).closest('.delContainer').remove();
            if ($('.delContainer').length == 0) {
                $("#createBill").hide();
                $("#removeAll").hide();
            }
        });
        $(priceContainer).append(priceInput);
        $(delContainer).append(productNameContainer);
        $(delContainer).append(priceContainer);
        $(delContainer).append(button);

        $("#inputContainer").append(delContainer);
    }

    $("#removeAll").click(function () {
        removeAllProduct();
        $("#createBill").hide();
        /*Скрывает элементы, если они были видимыми*/
        $("#removeAll").hide();
        $("#ticket").hide();
    });
    function removeAllProduct() {
        $("div#inputContainer").empty();
        /*Удаляет все дочерние блоки из каждого элемента*/
        $("div.purchasedGoods").empty();
    }
    function lightEmpty(){
        $(".delContainer").find('.empty_field').css({'border-color':'#d8512d'});
        // Через полсекунды удаляем подсветку
        setTimeout(function(){
            $(".delContainer").find('.empty_field').removeAttr('style');
        },500);
    }
    $("#createBill").click(function () {
        $("div.purchasedGoods").empty();
        var isFormValid = true;
        var sum=0;
        var percentage=0;
        var change=0;
        $(".delContainer").each(function () {
            if ($(this).find('.productName').val() !=''){
                $(this).find('.productName').removeClass('empty_field');
            }else {
                $(this).find('.productName').addClass('empty_field');
                isFormValid = false;
            }
            if ($(this).find('.price').val() !=''){
                sum += parseFloat($(this).find('.price').val());

                $(this).find('.price').removeClass('empty_field');
            }else {
                $(this).find('.price').addClass('empty_field');
                isFormValid = false;
            }
            percentage = parseFloat(sum-(sum/1.2)).toFixed(2);
            change = parseFloat(1000-sum).toFixed(2);
            var purchasedGood = $("<div class='col-md-12 purchasedGoods'>" + $(this).find('.productName').val() +
                "<span class='pull-right'>" + $(this).find('.price').val() + "</span></div>");
            $("#productListContainer").append(purchasedGood);
        });
        if (!isFormValid){
            lightEmpty();
            return false;
        }
        $("#change").text(change);
        $("#sumOfProduct").text(sum.toFixed(2));
        $("#percentageTotal").text(percentage);
        $("#percentageSum").text(percentage);
        $("#inputDate").text(dateTime);
        $("#ticket").show();
        $("#inputContainer").hide();
        $("#addProductBtn").hide();
        $("#createBill").hide();
        $("#removeAll").hide();
        $("#BackToCard").show();

    });
    $("#BackToCard").click(function () {
        $("#inputContainer").show();
        $("#addProductBtn").show();
        $("#createBill").show();
        $("#removeAll").show();
        $("#BackToCard").hide();
        $("#ticket").hide();
    });
        var date = new Date();
        Year = date.getFullYear();
        Month = date.getMonth()+1;
        day = date.getDate();
        Hour = date.getHours();
        Minutes = date.getMinutes();
        Seconds = date.getSeconds();
        dateTime = day +"-"+Month +"-"+ Year+" "+Hour+":"+Minutes+":"+Seconds;
        });
