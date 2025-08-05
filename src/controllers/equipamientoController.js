const { getConnection, sql } = require('../config/database');

// =============================================
// EQUIPAMIENTO DE ROPA
// =============================================

const getEquipamientoRopa = async (req, res) => {
  try {
    const { brigadaId } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input('brigadaId', sql.Int, brigadaId)
      .query(`
        SELECT er.*, ctr.Nombre as TipoRopaNombre
        FROM EquipamientoRopa er
        INNER JOIN CatTiposRopa ctr ON er.TipoRopaID = ctr.ID
        WHERE er.BrigadaID = @brigadaId
      `);
    
    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    console.error('Error al obtener equipamiento de ropa:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el equipamiento de ropa'
    });
  }
};

const createEquipamientoRopa = async (req, res) => {
  try {
    const { brigadaId } = req.params;
    const {
      TipoRopaID,
      CantidadXS,
      CantidadS,
      CantidadM,
      CantidadL,
      CantidadXL,
      Observaciones
    } = req.body;
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('brigadaId', sql.Int, brigadaId)
      .input('TipoRopaID', sql.Int, TipoRopaID)
      .input('CantidadXS', sql.Int, CantidadXS || 0)
      .input('CantidadS', sql.Int, CantidadS || 0)
      .input('CantidadM', sql.Int, CantidadM || 0)
      .input('CantidadL', sql.Int, CantidadL || 0)
      .input('CantidadXL', sql.Int, CantidadXL || 0)
      .input('Observaciones', sql.NVarChar, Observaciones)
      .query(`
        INSERT INTO EquipamientoRopa (
          BrigadaID, TipoRopaID, CantidadXS, CantidadS, CantidadM, 
          CantidadL, CantidadXL, Observaciones
        )
        OUTPUT INSERTED.ID
        VALUES (
          @brigadaId, @TipoRopaID, @CantidadXS, @CantidadS, @CantidadM,
          @CantidadL, @CantidadXL, @Observaciones
        )
      `);
    
    res.status(201).json({
      success: true,
      message: 'Equipamiento de ropa creado exitosamente',
      data: { ID: result.recordset[0].ID }
    });
  } catch (error) {
    console.error('Error al crear equipamiento de ropa:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el equipamiento de ropa'
    });
  }
};

// =============================================
// EQUIPAMIENTO DE BOTAS
// =============================================

const getEquipamientoBotas = async (req, res) => {
  try {
    const { brigadaId } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input('brigadaId', sql.Int, brigadaId)
      .query(`
        SELECT * FROM EquipamientoBotas
        WHERE BrigadaID = @brigadaId
      `);
    
    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    console.error('Error al obtener equipamiento de botas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el equipamiento de botas'
    });
  }
};

const createEquipamientoBotas = async (req, res) => {
  try {
    const { brigadaId } = req.params;
    const {
      Talla37,
      Talla38,
      Talla39,
      Talla40,
      Talla41,
      Talla42,
      Talla43,
      OtraTalla,
      CantidadOtraTalla,
      Observaciones
    } = req.body;
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('brigadaId', sql.Int, brigadaId)
      .input('Talla37', sql.Int, Talla37 || 0)
      .input('Talla38', sql.Int, Talla38 || 0)
      .input('Talla39', sql.Int, Talla39 || 0)
      .input('Talla40', sql.Int, Talla40 || 0)
      .input('Talla41', sql.Int, Talla41 || 0)
      .input('Talla42', sql.Int, Talla42 || 0)
      .input('Talla43', sql.Int, Talla43 || 0)
      .input('OtraTalla', sql.NVarChar, OtraTalla)
      .input('CantidadOtraTalla', sql.Int, CantidadOtraTalla || 0)
      .input('Observaciones', sql.NVarChar, Observaciones)
      .query(`
        INSERT INTO EquipamientoBotas (
          BrigadaID, Talla37, Talla38, Talla39, Talla40, Talla41, Talla42, Talla43,
          OtraTalla, CantidadOtraTalla, Observaciones
        )
        OUTPUT INSERTED.ID
        VALUES (
          @brigadaId, @Talla37, @Talla38, @Talla39, @Talla40, @Talla41, @Talla42, @Talla43,
          @OtraTalla, @CantidadOtraTalla, @Observaciones
        )
      `);
    
    res.status(201).json({
      success: true,
      message: 'Equipamiento de botas creado exitosamente',
      data: { ID: result.recordset[0].ID }
    });
  } catch (error) {
    console.error('Error al crear equipamiento de botas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el equipamiento de botas'
    });
  }
};

// =============================================
// EQUIPAMIENTO DE GUANTES
// =============================================

const getEquipamientoGuantes = async (req, res) => {
  try {
    const { brigadaId } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input('brigadaId', sql.Int, brigadaId)
      .query(`
        SELECT * FROM EquipamientoGuantes
        WHERE BrigadaID = @brigadaId
      `);
    
    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    console.error('Error al obtener equipamiento de guantes:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el equipamiento de guantes'
    });
  }
};

const createEquipamientoGuantes = async (req, res) => {
  try {
    const { brigadaId } = req.params;
    const {
      TallaXS,
      TallaS,
      TallaM,
      TallaL,
      TallaXL,
      TallaXXL,
      OtraTalla,
      CantidadOtraTalla,
      Observaciones
    } = req.body;
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('brigadaId', sql.Int, brigadaId)
      .input('TallaXS', sql.Int, TallaXS || 0)
      .input('TallaS', sql.Int, TallaS || 0)
      .input('TallaM', sql.Int, TallaM || 0)
      .input('TallaL', sql.Int, TallaL || 0)
      .input('TallaXL', sql.Int, TallaXL || 0)
      .input('TallaXXL', sql.Int, TallaXXL || 0)
      .input('OtraTalla', sql.NVarChar, OtraTalla)
      .input('CantidadOtraTalla', sql.Int, CantidadOtraTalla || 0)
      .input('Observaciones', sql.NVarChar, Observaciones)
      .query(`
        INSERT INTO EquipamientoGuantes (
          BrigadaID, TallaXS, TallaS, TallaM, TallaL, TallaXL, TallaXXL,
          OtraTalla, CantidadOtraTalla, Observaciones
        )
        OUTPUT INSERTED.ID
        VALUES (
          @brigadaId, @TallaXS, @TallaS, @TallaM, @TallaL, @TallaXL, @TallaXXL,
          @OtraTalla, @CantidadOtraTalla, @Observaciones
        )
      `);
    
    res.status(201).json({
      success: true,
      message: 'Equipamiento de guantes creado exitosamente',
      data: { ID: result.recordset[0].ID }
    });
  } catch (error) {
    console.error('Error al crear equipamiento de guantes:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el equipamiento de guantes'
    });
  }
};

// =============================================
// FUNCIONES GENÉRICAS PARA EQUIPAMIENTO
// =============================================

const getEquipamientoGenerico = async (tableName, brigadaId, res) => {
  try {
    const pool = await getConnection();
    let query = '';
    
    switch (tableName) {
      case 'EquipamientoEPP':
        query = `
          SELECT e.*, cep.Nombre as EquipoNombre
          FROM EquipamientoEPP e
          INNER JOIN CatEquipamientoEPP cep ON e.EquipoEPPID = cep.ID
          WHERE e.BrigadaID = @brigadaId
        `;
        break;
      case 'Herramientas':
        query = `
          SELECT h.*, ch.Nombre as HerramientaNombre
          FROM Herramientas h
          INNER JOIN CatHerramientas ch ON h.HerramientaID = ch.ID
          WHERE h.BrigadaID = @brigadaId
        `;
        break;
      case 'LogisticaVehiculos':
        query = `
          SELECT lv.*, csv.Nombre as ServicioNombre
          FROM LogisticaVehiculos lv
          INNER JOIN CatServiciosVehiculos csv ON lv.ServicioVehiculoID = csv.ID
          WHERE lv.BrigadaID = @brigadaId
        `;
        break;
      case 'AlimentacionBebidas':
        query = `
          SELECT ab.*, cab.Nombre as AlimentoNombre
          FROM AlimentacionBebidas ab
          INNER JOIN CatAlimentosBebidas cab ON ab.AlimentoBebidaID = cab.ID
          WHERE ab.BrigadaID = @brigadaId
        `;
        break;
      case 'EquipoCampo':
        query = `
          SELECT ec.*, cec.Nombre as EquipoNombre
          FROM EquipoCampo ec
          INNER JOIN CatEquipoCampo cec ON ec.EquipoCampoID = cec.ID
          WHERE ec.BrigadaID = @brigadaId
        `;
        break;
      case 'LimpiezaPersonal':
        query = `
          SELECT lp.*, clp.Nombre as ProductoNombre
          FROM LimpiezaPersonal lp
          INNER JOIN CatLimpiezaPersonal clp ON lp.ProductoLimpiezaPersonalID = clp.ID
          WHERE lp.BrigadaID = @brigadaId
        `;
        break;
      case 'LimpiezaGeneral':
        query = `
          SELECT lg.*, clg.Nombre as ProductoNombre
          FROM LimpiezaGeneral lg
          INNER JOIN CatLimpiezaGeneral clg ON lg.ProductoLimpiezaGeneralID = clg.ID
          WHERE lg.BrigadaID = @brigadaId
        `;
        break;
      case 'Medicamentos':
        query = `
          SELECT m.*, cm.Nombre as MedicamentoNombre
          FROM Medicamentos m
          INNER JOIN CatMedicamentos cm ON m.MedicamentoID = cm.ID
          WHERE m.BrigadaID = @brigadaId
        `;
        break;
      case 'RescateAnimal':
        query = `
          SELECT ra.*, caa.Nombre as AlimentoNombre
          FROM RescateAnimal ra
          INNER JOIN CatAlimentosAnimales caa ON ra.AlimentoAnimalID = caa.ID
          WHERE ra.BrigadaID = @brigadaId
        `;
        break;
    }
    
    const result = await pool.request()
      .input('brigadaId', sql.Int, brigadaId)
      .query(query);
    
    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    console.error(`Error al obtener ${tableName}:`, error);
    res.status(500).json({
      success: false,
      message: `Error al obtener ${tableName}`
    });
  }
};

const createEquipamientoGenerico = async (tableName, brigadaId, req, res) => {
  try {
    const pool = await getConnection();
    let query = '';
    let inputs = {};
    
    switch (tableName) {
      case 'EquipamientoEPP':
        inputs = {
          EquipoEPPID: req.body.EquipoEPPID,
          Cantidad: req.body.Cantidad || 0,
          Observaciones: req.body.Observaciones
        };
        query = `
          INSERT INTO EquipamientoEPP (BrigadaID, EquipoEPPID, Cantidad, Observaciones)
          OUTPUT INSERTED.ID
          VALUES (@brigadaId, @EquipoEPPID, @Cantidad, @Observaciones)
        `;
        break;
      case 'Herramientas':
        inputs = {
          HerramientaID: req.body.HerramientaID,
          Cantidad: req.body.Cantidad || 0,
          Observaciones: req.body.Observaciones
        };
        query = `
          INSERT INTO Herramientas (BrigadaID, HerramientaID, Cantidad, Observaciones)
          OUTPUT INSERTED.ID
          VALUES (@brigadaId, @HerramientaID, @Cantidad, @Observaciones)
        `;
        break;
      case 'LogisticaVehiculos':
        inputs = {
          ServicioVehiculoID: req.body.ServicioVehiculoID,
          MontoAproximado: req.body.MontoAproximado || 0,
          Observaciones: req.body.Observaciones
        };
        query = `
          INSERT INTO LogisticaVehiculos (BrigadaID, ServicioVehiculoID, MontoAproximado, Observaciones)
          OUTPUT INSERTED.ID
          VALUES (@brigadaId, @ServicioVehiculoID, @MontoAproximado, @Observaciones)
        `;
        break;
      case 'AlimentacionBebidas':
        inputs = {
          AlimentoBebidaID: req.body.AlimentoBebidaID,
          Cantidad: req.body.Cantidad || 0,
          Observaciones: req.body.Observaciones
        };
        query = `
          INSERT INTO AlimentacionBebidas (BrigadaID, AlimentoBebidaID, Cantidad, Observaciones)
          OUTPUT INSERTED.ID
          VALUES (@brigadaId, @AlimentoBebidaID, @Cantidad, @Observaciones)
        `;
        break;
      case 'EquipoCampo':
        inputs = {
          EquipoCampoID: req.body.EquipoCampoID,
          Cantidad: req.body.Cantidad || 0,
          Observaciones: req.body.Observaciones
        };
        query = `
          INSERT INTO EquipoCampo (BrigadaID, EquipoCampoID, Cantidad, Observaciones)
          OUTPUT INSERTED.ID
          VALUES (@brigadaId, @EquipoCampoID, @Cantidad, @Observaciones)
        `;
        break;
      case 'LimpiezaPersonal':
        inputs = {
          ProductoLimpiezaPersonalID: req.body.ProductoLimpiezaPersonalID,
          Cantidad: req.body.Cantidad || 0,
          Observaciones: req.body.Observaciones
        };
        query = `
          INSERT INTO LimpiezaPersonal (BrigadaID, ProductoLimpiezaPersonalID, Cantidad, Observaciones)
          OUTPUT INSERTED.ID
          VALUES (@brigadaId, @ProductoLimpiezaPersonalID, @Cantidad, @Observaciones)
        `;
        break;
      case 'LimpiezaGeneral':
        inputs = {
          ProductoLimpiezaGeneralID: req.body.ProductoLimpiezaGeneralID,
          Cantidad: req.body.Cantidad || 0,
          Observaciones: req.body.Observaciones
        };
        query = `
          INSERT INTO LimpiezaGeneral (BrigadaID, ProductoLimpiezaGeneralID, Cantidad, Observaciones)
          OUTPUT INSERTED.ID
          VALUES (@brigadaId, @ProductoLimpiezaGeneralID, @Cantidad, @Observaciones)
        `;
        break;
      case 'Medicamentos':
        inputs = {
          MedicamentoID: req.body.MedicamentoID,
          Cantidad: req.body.Cantidad || 0,
          Observaciones: req.body.Observaciones
        };
        query = `
          INSERT INTO Medicamentos (BrigadaID, MedicamentoID, Cantidad, Observaciones)
          OUTPUT INSERTED.ID
          VALUES (@brigadaId, @MedicamentoID, @Cantidad, @Observaciones)
        `;
        break;
      case 'RescateAnimal':
        inputs = {
          AlimentoAnimalID: req.body.AlimentoAnimalID,
          Cantidad: req.body.Cantidad || 0,
          Observaciones: req.body.Observaciones
        };
        query = `
          INSERT INTO RescateAnimal (BrigadaID, AlimentoAnimalID, Cantidad, Observaciones)
          OUTPUT INSERTED.ID
          VALUES (@brigadaId, @AlimentoAnimalID, @Cantidad, @Observaciones)
        `;
        break;
    }
    
    const request = pool.request()
      .input('brigadaId', sql.Int, brigadaId);
    
    // Agregar inputs dinámicamente
    Object.keys(inputs).forEach(key => {
      if (key.includes('ID')) {
        request.input(key, sql.Int, inputs[key]);
      } else if (key.includes('Cantidad') || key.includes('Monto')) {
        request.input(key, sql.Decimal(10, 2), inputs[key]);
      } else {
        request.input(key, sql.NVarChar, inputs[key]);
      }
    });
    
    const result = await request.query(query);
    
    res.status(201).json({
      success: true,
      message: `${tableName} creado exitosamente`,
      data: { ID: result.recordset[0].ID }
    });
  } catch (error) {
    console.error(`Error al crear ${tableName}:`, error);
    res.status(500).json({
      success: false,
      message: `Error al crear ${tableName}`
    });
  }
};

// Exportar controladores específicos
module.exports = {
  // Ropa
  getEquipamientoRopa,
  createEquipamientoRopa,
  
  // Botas
  getEquipamientoBotas,
  createEquipamientoBotas,
  
  // Guantes
  getEquipamientoGuantes,
  createEquipamientoGuantes,
  
  // Funciones genéricas
  getEquipamientoGenerico,
  createEquipamientoGenerico
}; 