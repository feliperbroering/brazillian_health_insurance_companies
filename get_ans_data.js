const puppeteer = require('puppeteer');
const ObjectsToCsv = require('objects-to-csv');

const URL_QUALIFICA = 'http://www.ans.gov.br/qualificacao_consumidor/informacoes_operadora.asp?co_operadora_param=';

const URL_SALA_RESUMO = 'http://www.ans.gov.br/pentaho/api/repos/:public:Sala%20Externo:Sala%20de%20Situacao.wcdf/generatedContent?userid=penanoprod&password=PRDAUpent001&codOperadora=';

const OPS_IDS = ['326305', '005711', '368253', '359017', '006246', '339679', '343889', '393321', '346659', '352501', '302091', '335690', '319996', '304701', '000701', '325074', '309222', '323080', '302147', '419133', '416428', '348520', '317144', '339601', '357391', '382876', '355097', '340782', '312924', '303976', '366871', '345695', '000582', '382540', '342033', '333689', '344885', '413534', '342084', '325571', '343269', '319121', '392804', '335100', '403911', '360449', '312126', '343731', '355721', '355691', '335592', '306398', '312720', '339954', '348805', '321044', '315729', '371254', '351202', '415111', '394734', '327689', '314218', '306886', '373010', '350249', '326500', '414450', '384577', '312851', '331872', '334561', '303267', '369659', '315796', '000477', '354031', '360244', '321273', '350141', '370070', '364312', '333051', '303623', '353353', '368849', '335479', '311847', '354066', '344362', '369292', '311961', '349682', '418021', '310247', '411256', '320706', '363766', '309192', '337668', '344397', '336106', '315478', '320111', '337510', '346926', '348295', '360767', '302953', '352586', '417238', '419010', '354783', '379956', '359289', '359661', '321958', '326861', '402966', '349712', '323811', '318299', '327417', '337188', '356417', '420077', '323268', '329339', '386588', '419249', '352331', '324477', '417530', '303356', '340952', '357511', '367087', '370088', '342556', '303739', '417505', '331317', '367095', '348180', '353663', '410632', '357260', '364584', '324698', '324213', '346276', '306649', '348830', '345628', '369373', '371106', '342807', '354295', '352683', '366145', '414131', '331988', '401081', '320251', '366561', '414298', '371629', '322326', '411752', '359777', '301574', '349534', '304051', '319708', '413275', '358088', '342611', '331341', '338559', '416568', '348406', '336165', '347507', '326755', '348082', '351407', '367397', '419427', '370681', '313971', '354562', '415693', '304883', '417823', '418285', '355151', '395480', '372609', '328537', '309338', '307319', '333662', '309028', '314099', '412538', '345598', '322261', '328294', '349194', '306126', '316881', '385697', '344729', '000515', '322831', '356123', '311715', '361615', '418170', '364860', '309907', '323993', '336831', '343013', '318388', '350371', '337374', '353060', '414492', '420166', '311375', '316148', '312347', '330108', '371777', '319872', '317233', '347655', '343463', '410047', '344800', '414581', '413194', '301728', '400891', '360481', '311294', '329886', '357065', '322571', '413330', '369411', '319384', '300136', '305472', '321869', '306762', '313211', '337871', '314668', '352543', '419141', '306100', '343064', '414352', '400190', '345474', '380661', '338648', '362140', '417947', '311359', '351091', '416398', '324345', '418587', '316873', '335614', '331651', '300713', '416401', '409243', '345091', '351792', '419338', '385255', '323926', '345458', '325236', '305227', '346209', '345709', '315265', '320862', '309087', '410292', '315044', '352179', '415774', '330264', '320587', '356581', '304344', '414930', '324361', '303844', '415847', '386596', '000027', '350699', '417599', '311618', '317632', '357022', '345776', '312592', '320820', '403962', '412759', '358096', '364070', '325031', '418072', '416584', '324493', '346471', '335215', '304531', '310522', '330566', '356476', '392391', '402851', '330809', '361941', '304395', '352314', '339539', '354571', '349755', '328332', '403920', '336858', '415014', '419168', '324159', '323055', '363685', '418803', '301060', '324566', '353027', '318213', '401196', '318566', '317012', '304468', '418374', '420158', '411582', '321338', '335517', '348244', '303178', '346870', '348261', '335541', '319422', '416738', '416070', '419150', '354511', '350729', '421006', '363855', '361011', '347108', '318035', '368920', '363286', '406554', '337498', '359033', '354279', '301744', '417548', '304123', '365777', '320897', '334154', '354325', '315567', '413291', '370975', '314102', '305995', '416495', '330116', '323942', '418137', '366064', '320510', '418781', '419320', '413160', '324299', '305626', '317896', '329355', '350346', '342343', '418854', '418919', '339270', '353876', '365238', '328308', '313084', '347230', '354627', '333808', '318477', '319180', '311146', '310131', '406708', '343676', '372561', '402001', '412252', '361461', '330892', '360414', '343684', '354554', '338346', '315648', '339636', '410624', '358754', '346951', '368148', '361852', '410110', '340251', '327557', '420000', '000884', '330051', '354619', '301124', '334189', '365530', '343331', '362573', '415049', '420204', '306444', '367613', '414310', '366340', '325465', '314251', '321087', '416894', '307751', '327468', '300012', '407011', '315494', '322547', '333875', '355593', '341941', '314170', '354996', '314706', '420905', '416282', '417297', '328073', '352519', '414247', '406945', '420085', '312282', '355577', '359122', '324175', '340162', '378216', '366234', '373141', '347591', '419851', '420751', '418731', '412635', '314242', '351270', '321320', '347736', '353264', '308811', '417491', '371564', '328596', '354678', '419958', '325082', '314609', '357715', '314587', '302228', '351776', '382281', '407534', '314781', '385620', '421341', '412490', '416690', '419052', '362832', '327638', '410128', '358282', '313904', '334847', '326089', '309524', '348066', '342131', '369233', '306754', '333328', '302490', '330027', '386901', '413372', '323357', '311499', '335754', '342386', '327352', '313149', '419486', '406937', '352861', '401480', '419834', '408794', '418501', '413721', '332291', '340146', '335789', '409464', '410888', '412058', '342408', '416819', '414905', '418650', '311405', '416576', '358169', '311944', '408883', '353698', '363391', '350648', '415901', '358509', '358053', '417211', '323004', '412295', '402478', '333867', '315583', '410322', '417955', '308005', '411868', '418951', '394271', '328375', '381799', '384704', '343722', '417661', '402834', '306959', '414212', '309362', '410608', '412015', '311057', '324892', '330281', '404241', '416703', '329665', '416975', '418749', '419699', '316458', '392405', '419753', '305928', '419362', '337561', '410179', '358410', '370592', '343129', '329282', '345741', '393533', '309699', '406805', '406635', '342157', '344788', '363111', '335657', '418226', '416118', '313955', '356891', '419273', '311472', '343153', '413551', '347825', '316849', '418617', '420701', '420069', '409413', '363189', '408522', '411809', '418862', '366811', '420271', '336467', '418676', '370321', '420123', '306045', '343765', '383520', '310361', '400319', '342955', '418820', '413518', '302627', '358711', '304131', '306525', '321931', '411248', '352888', '414026', '350362', '408263', '357669', '324523', '408026', '412228', '407569', '313475', '420816', '304212', '335851', '419516', '409235', '409405', '419974', '346403', '418218', '408034', '415944', '344915', '417092', '403130', '402206', '419311', '309401', '406813', '341819', '416509', '316903', '418935', '362182', '407097', '344184', '360783', '304697', '414689', '344010', '408093', '416983', '409634', '402770', '390259', '407704', '388092', '315630', '415910', '344141', '407224', '387185', '414573', '420093', '409286', '382639', '344443', '418129', '365645', '364592', '419591', '310239', '415413', '415081', '420841', '320838', '414913', '416657', '415898', '331856', '357138', '327328', '334511', '413267', '406457', '406210', '419206', '351644', '338915', '420930', '417475', '413755', '304158', '360147', '420981', '312363', '347361', '300870', '363944', '328031', '316741'];

// Ops = Brazil Health Insurance Companies
let Ops = [];

(async () => {
    const browser = await puppeteer.launch({headless: true});
    
    const page = await browser.newPage();

    let opCode;


for (let i = 0; i < OPS_IDS.length; i++) {
 
    opCode = OPS_IDS[i]


    await page.goto(`${URL_QUALIFICA}${opCode}`, {waitUntil: 'networkidle2'});

    let dataQualifica = await page.evaluate(() => {
        let d = {};

        d.id = document.querySelector('#content > table > tbody > tr:nth-child(2) > td:nth-child(2)') ? document.querySelector('#content > table > tbody > tr:nth-child(2) > td:nth-child(2)').innerText.replace(/[^a-zA-Z0-9]/g, "") : "";

        d.alias = document.querySelector('#content > table > tbody > tr:nth-child(1) > td:nth-child(2)') ? document.querySelector('#content > table > tbody > tr:nth-child(1) > td:nth-child(2)').innerText : "";

        d.cnpj = document.querySelector('#content > table > tbody > tr:nth-child(3) > td:nth-child(2)') ? document.querySelector('#content > table > tbody > tr:nth-child(3) > td:nth-child(2)').innerText.replace(/[^0-9]/g,"") : "";

        d.name = document.querySelector('#content > table > tbody > tr:nth-child(4) > td:nth-child(2)') ? document.querySelector('#content > table > tbody > tr:nth-child(4) > td:nth-child(2)').innerText : "";

        d.status = document.querySelector('#content > table > tbody > tr:nth-child(5) > td:nth-child(2)') ? document.querySelector('#content > table > tbody > tr:nth-child(5) > td:nth-child(2)').innerText : "";

        d.totalCustomers = document.querySelector('#content > table > tbody > tr:nth-child(6) > td:nth-child(2)') ? document.querySelector('#content > table > tbody > tr:nth-child(6) > td:nth-child(2)').innerText.replace(/[^0-9]/g,"") : "";

        d.type = document.querySelector('#content > table > tbody > tr:nth-child(7) > td:nth-child(2)') ? document.querySelector('#content > table > tbody > tr:nth-child(7) > td:nth-child(2)').innerText : "";

        d.modality = document.querySelector('#content > table > tbody > tr:nth-child(8) > td:nth-child(2)') ? document.querySelector('#content > table > tbody > tr:nth-child(8) > td:nth-child(2)').innerText : "";

        d.IDSSscore = document.querySelector('#form > div.boxcinza-ans > div > div > div > div') ? document.querySelector('#form > div.boxcinza-ans > div > div > div > div').innerText.replace(".", ","): ""; 

        return d;
    });

    await page.goto(`${URL_SALA_RESUMO}${opCode}`, {waitUntil: 'networkidle2'});

    let dataResumeData = await page.evaluate(() => {
        
        let d = {};

        d.medicalCustomers = document.querySelector('#cBenefAssistTable > tbody > tr > td.column0.numericBR22INT > span') ? document.querySelector('#cBenefAssistTable > tbody > tr > td.column0.numericBR22INT > span').innerText.replace(/[^0-9]/g,"") : "";

        d.dentalCustomers = document.querySelector('#cBenefOdontoTable > tbody > tr > td.column0.numericBR22INT > span') ? document.querySelector('#cBenefOdontoTable > tbody > tr > td.column0.numericBR22INT > span').innerText.replace(/[^0-9]/g,"") : "";

        d.createdAt = document.querySelector('#cDadosOperHorizTable > tbody > tr:nth-child(3) > td.column0.formattedText > span > span') ? document.querySelector('#cDadosOperHorizTable > tbody > tr:nth-child(3) > td.column0.formattedText > span > span').innerText : "";

        d.revenue = document.querySelector('#cReceitaContraTable > tbody > tr > td.column0.formattedText') ? document.querySelector('#cReceitaContraTable > tbody > tr > td.column0.formattedText').children[0].innerText.replace(/[^0-9,]/g,"") : "";

        d.expenses = document.querySelector('#cDespesaAssistencialTable > tbody > tr > td.column0.formattedText') ? document.querySelector('#cDespesaAssistencialTable > tbody > tr > td.column0.formattedText').children[0].innerText.replace(/[^0-9,]/g,"") : "";

        d.medicalElderlyCustomersPercentage = document.querySelector('#cIdososAssistTable > tbody > tr > td.column1.formattedText') ? document.querySelector('#cIdososAssistTable > tbody > tr > td.column1.formattedText').children[0].innerText : "";

        d.dentalElderlyCustomersPercentage = document.querySelector('#cIdososOdontoTable > tbody > tr > td.column1.formattedText') ? document.querySelector('#cIdososOdontoTable > tbody > tr > td.column1.formattedText').children[0].innerText.replace("%", "") : "";

        d.NIPtotal = document.querySelector('#cNIPTable > tbody > tr > td') ? document.querySelector('#cNIPTable > tbody > tr > td').children[0].innerText : "";

        d.ativoCirculante = document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(1) > td.column1.formattedText') ? document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(1) > td.column1.formattedText').children[0].innerText.replace(/[^0-9,]/g, "") : "";

        d.ativoNaoCirculante = document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(2) > td.column1.formattedText') ? document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(2) > td.column1.formattedText').children[0].innerText.replace(/[^0-9,]/g,"") : "";

        d.ativoTotal = document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(4) > td.column1.formattedText') ? document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(4) > td.column1.formattedText').children[0].innerText.replace(/[^0-9,]/g,"") : "";

        d.passivoCirculante = document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(1) > td.column3.formattedText') ? document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(1) > td.column3.formattedText').children[0].innerText.replace(/[^0-9,]/g,"") : "";

        d.passivoNaoCirculante = document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(2) > td.column3.formattedText') ? document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(2) > td.column3.formattedText').children[0].innerText.replace(/[^0-9,]/g,"") : "";

        d.patrimonioLiquido = document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(3) > td.column3.formattedText') ? document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(3) > td.column3.formattedText').children[0].innerText.replace(/[^0-9,]/g,"") : "";

        d.totalPassivo = document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(4) > td.column3.formattedText') ? document.querySelector('#cdadosOperIndlinhaTable > tbody > tr:nth-child(4) > td.column3.formattedText').children[0].innerText.replace(/[^0-9,]/g,"") : "";

        d.totalProvisoesTecnicas = document.querySelector('#cdadosOperIndlinha1Table > tbody > tr.odd > td').children[0] ? document.querySelector('#cdadosOperIndlinha1Table > tbody > tr.odd > td').children[0].innerText.replace(/[^0-9,]/g,"") : "";

        d.ativosGarantidoresProvTecnicas = document.querySelector('#cdadosOperIndlinha1Table > tbody > tr.even > td') ? document.querySelector('#cdadosOperIndlinha1Table > tbody > tr.even > td').children[0].innerText.replace(/[^0-9,]/g,"") : "";

        return d;
    });


    let data = Object.assign(dataQualifica, dataResumeData);

    console.dir(data.alias);

    Ops.push(data)
}

await browser.close();

let csv = new ObjectsToCsv(Ops);

await csv.toDisk('./ans.csv');

})();