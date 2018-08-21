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
    cy.get("#getin_date").select("2018/09/03【一】");

    // 起站代碼:
    cy.get("#from_station")
      .select("100-台北")
      .should("have.value", "100");

    // 到站代碼:
    cy.get("#to_station")
      .select("004-台東")
      .should("have.value", "004");

    // 車種:
    cy.get("#train_type")
      .select("*1-自強號")
      .should("have.value", "*1");

    // 起始時間:
    cy.get("#getin_start_dtime").select("06:00");

    // 截止時間:
    cy.get("#getin_end_dtime").select("12:00");

    // 訂票張數:
    cy.get("#order_qty_str").select("3");
    cy.wait(1000);
    cy.get("form").submit();

    //　等待輸入驗證碼...
    cy.contains("a", "406", {
      timeout: 30000,
    }).click();

    //　等待輸入驗證碼...

    cy.contains("訂票成功", {
      timeout: 30000,
    });
    cy.screenshot("order-success");
    var orderCode;
    cy.get("#spanOrderCode").then($span => {
      orderCode = $span.text();
    });
    console.log(orderCode);

    cy.get(".form-group").then($body => {
      if ($body.text().includes("同一車廂")) {
        cy.screenshot("perfect-success");
      } else {
        cy.contains("取消此車次訂票").click();
        // cy.visit("http://railway.hinet.net/Foreign/TW/ecancel.html");
        // cy.contains("取消訂票紀錄");
        // cy.get("#personId")
        //   .type(userId)
        //   .should("have.value", userId);
        // cy.get("#orderCode")
        //   .type(orderCode)
        //   .should("have.value", orderCode);
        // cy.get("form").submit();
        cy.screenshot("cancel");
        cy.contains("您的訂票紀錄如下");
        cy.get("form").submit();
        cy.contains("您訂的車票已取消");
        cy.screenshot("cancel-success");
      }
    });
  });
});