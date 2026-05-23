<?php
require_once __DIR__ . "/../../1.SourceCode/2.FrontEnd/config/config.php"; 
?>
<!-- Import jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Import thư viện SearchBar & Table2 -->
<link href="<?php echo $cdnServer; ?>/lib/searchBarAll/v2/searchBarAll.css" type="text/css" rel="stylesheet">
<script src="<?php echo $cdnServer; ?>/lib/searchBarAll/v2/searchBarAll.js"></script>
<script src="<?php echo $cdnServer; ?>/lib/htmlTable2/table.js"></script>
<link href="<?php echo $cdnServer; ?>/lib/htmlTable2/table.css" type="text/css" rel="stylesheet">

<div id="mkacui-root-layout">
  <div id="content-wrapper">
    <div id="content" class="mkacui-container-root mkacui-flex-y content" style="padding: 20px;">
        
        <!-- Top Control Area -->
        <div style="display: flex; gap: 20px; align-items: flex-end; margin-bottom: 15px;">
            <button id="btnBack" style="background: #fff; border: 1px solid #777; padding: 0 30px; height: 38px; font-weight: 500; cursor: pointer; margin-bottom: 3px;">
                Trở lại
            </button>
            
            <div id="searchbar" style="flex-grow: 1;">
                <div id="searchbar_content"></div>
            </div>
        </div>
        
        <!-- Main Layout Split -->
        <div style="display: flex; gap: 30px; margin-top: 10px;">
            <!-- Cột trái: Danh sách kế hoạch -->
            <div id="planList" style="width: 200px; flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                <!-- Dữ liệu render từ JS -->
            </div>
            
            <!-- Cột phải: Chú thích & Bảng -->
            <div style="flex-grow: 1; overflow: hidden;">
                <!-- Chú giải trạng thái (tham khảo màn maintain_plan_detail) -->
                <div style="display: flex; gap: 20px; align-items: center; font-size: 16px; font-weight: 500; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="display: inline-block; width: 22px; height: 22px; background-color: #36c963; border: 1px solid #2a9d4d;"></span>
                        Đã hoàn thành
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="display: inline-block; width: 22px; height: 22px; background-color: #ef4444; border: 1px solid #b91c1c;"></span>
                        Chưa hoàn thành
                    </div>
                </div>

                <!-- Bảng hiển thị (Table2 render vào đây) -->
                <div id="inventoryTable"></div>
            </div>
        </div>

    </div>
  </div>
</div>

<link href="style.css" type="text/css" rel="stylesheet">
<script src="script.js"></script>
