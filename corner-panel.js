document.addEventListener('DOMContentLoaded', function(event) {
    if (window.innerWidth < 700) return
    const cornerPanel = document.getElementById("corner_panel");

    var selectOptions = [
        { id: 1,text: '▼ 選択してください', value: '' },
        { id: 2,text: '北海道', value: '北海道' },
        { id: 3,text: '東京都', value: '東京都' },
    ];
    axios({
        method       : 'GET',
        url          : corner_panel_template,
        //params       : { foo: 'var' },
        responseType : 'document',
    })
    .then((res) => {
        var html = res.data.getElementById("corner_panel_app");
        cornerPanel.appendChild(html);

        var cornerPanelApp = new Vue({
            el: '#corner_panel_app',
            data: {
                selected: '',
                options: selectOptions,
                started: false,
                phase1: false,
                phase1_1: false,
                phase1_2: false,
                phase2: false,
                phase2_1: false,
                phase2_2: false,
                abc_text: '',
                is_btn_disabled: false,
                phase3: false,
                result: '',
            },

            methods: {
                changeSelect: function() {
                    this.phase1_1 = true
                    var self = this;
                    setTimeout((function(){ self.phase1_2 = true }) , 1500)
                    setTimeout((function(){ self.phase2 = true }) , 3000)
                },
                abcSelected: function(event) {
                    this.is_btn_disabled = true
                    this.result = event.target.id
                    this.abc_text = event.target.name
                    this.phase2_1 = true
                    var self = this;
                    setTimeout((function(){ self.phase2_2 = true }) , 1500)
                    setTimeout((function(){ self.phase3 = true }) , 3000)
                },
                abort: function() {
                    this.started = false
                    this.selected = ''
                    this.abc_text = ''
                    this.phase1 = false
                    this.phase1_1 = false
                    this.phase1_2 = false
                    this.phase2 = false
                    this.phase2_1 = false
                    this.phase2_2 = false
                    this.phase3 = false
                    this.is_btn_disabled = false
                }
            }
        })
    })
    .catch(function (e) {
        console.log('ERROR:--------')
        console.log(e);
        console.log('---------:ERROR');
    });
});
