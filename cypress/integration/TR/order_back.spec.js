const userId = "";

context("Actions", async () => {
  beforeEach(() => {
    cy.visit("http://railway1.hinet.net/Foreign/TW/ecsearch.html");
  });

  // https://on.cypress.io/interacting-with-elements

  it("輸入身分證字號", () => {
    // 輸入身分證字號
    cy.get("#person_id")
      .type(userId)
      .should("have.value", userId);

    // 選擇乘車日期:
    cy.get("#getin_date").select("2018/10/28【日】");

    // 起站代碼:
    cy.get("#from_station")
      .select("051-花蓮")
      .should("have.value", "051");

    // 到站代碼:
    cy.get("#to_station")
      .select("100-台北")
      .should("have.value", "100");

    // 車種:
    cy.get("#train_type")
      .select("*1-自強號")
      .should("have.value", "*1");

    // 起始時間:
    cy.get("#getin_start_dtime").select("1900:00");

    // 截止時間:
    cy.get("#getin_end_dtime").select("10:00");

    // 訂票張數:
    cy.get("#order_qty_str").select("2");
    cy.wait(500);
    cy.get("form").submit();

    cy.get("#randInput").focus();
    //　等待輸入驗證碼...
    cy.contains("a", "6247", {
      timeout: 30000,
    }).click();

    cy.get("#randInput").focus();
    //　等待輸入驗證碼...

    cy.contains("訂票成功", {
      timeout: 30000,
    });
    cy.screenshot("order-success");
    cy.wait(1000);
    // var orderCode;
    // cy.get("#spanOrderCode").then($span => {
    //   orderCode = $span.text();
    // });
    // console.log(orderCode);

    cy.get(".form-group").then($body => {
      if ($body.text().includes("同一車廂")) {
        cy.screenshot("perfect-success");
        alert("成功訂到同一車廂啦!!");
      } else {
        // cy.visit("http://railway.hinet.net/Foreign/TW/ecancel.html");
        // cy.contains("取消訂票紀錄");
        // cy.get("#personId")
        //   .type(userId)
        //   .should("have.value", userId);
        // cy.get("#orderCode")
        //   .type(orderCode)
        //   .should("have.value", orderCode);
        // cy.get("form").submit();
        //
        //
        // cy.contains("取消此車次訂票").click();
        // cy.screenshot("cancel");
        // cy.contains("您的訂票紀錄如下");
        // cy.get("form").submit();
        // cy.contains("您訂的車票已取消");
        // cy.screenshot("cancel-success");
      }
    });
  });
});
