const { getConnection, sql } = require('../config/database');

// Función genérica para obtener catálogos
const getCatalogo = async (tableName, req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query(`SELECT * FROM ${tableName} WHERE Activo = 1 ORDER BY Nombre`);
    
    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    console.error(`Error al obtener catálogo ${tableName}:`, error);
    res.status(500).json({
      success: false,
      message: `Error al obtener el catálogo ${tableName}`
    });
  }
};

// Función genérica para crear elementos en catálogos
const createCatalogoItem = async (tableName, req, res) => {
  try {
    const { Nombre, Descripcion } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
      .input('Nombre', sql.NVarChar, Nombre)
      .input('Descripcion', sql.NVarChar, Descripcion)
      .query(`
        INSERT INTO ${tableName} (Nombre, Descripcion)
        OUTPUT INSERTED.ID, INSERTED.Nombre
        VALUES (@Nombre, @Descripcion)
      `);
    
    res.status(201).json({
      success: true,
      message: 'Elemento creado exitosamente',
      data: result.recordset[0]
    });
  } catch (error) {
    console.error(`Error al crear elemento en ${tableName}:`, error);
    res.status(500).json({
      success: false,
      message: `Error al crear el elemento en ${tableName}`
    });
  }
};

// Función genérica para actualizar elementos en catálogos
const updateCatalogoItem = async (tableName, req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Descripcion } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('Nombre', sql.NVarChar, Nombre)
      .input('Descripcion', sql.NVarChar, Descripcion)
      .query(`
        UPDATE ${tableName}
        SET Nombre = @Nombre, Descripcion = @Descripcion
        WHERE ID = @id AND Activo = 1
      `);
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: 'Elemento no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Elemento actualizado exitosamente'
    });
  } catch (error) {
    console.error(`Error al actualizar elemento en ${tableName}:`, error);
    res.status(500).json({
      success: false,
      message: `Error al actualizar el elemento en ${tableName}`
    });
  }
};

// Función genérica para eliminar elementos en catálogos
const deleteCatalogoItem = async (tableName, req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`UPDATE ${tableName} SET Activo = 0 WHERE ID = @id AND Activo = 1`);
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: 'Elemento no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Elemento eliminado exitosamente'
    });
  } catch (error) {
    console.error(`Error al eliminar elemento en ${tableName}:`, error);
    res.status(500).json({
      success: false,
      message: `Error al eliminar el elemento en ${tableName}`
    });
  }
};

// Controladores específicos para cada catálogo
const tiposRopa = {
  getAll: (req, res) => getCatalogo('CatTiposRopa', req, res),
  create: (req, res) => createCatalogoItem('CatTiposRopa', req, res),
  update: (req, res) => updateCatalogoItem('CatTiposRopa', req, res),
  delete: (req, res) => deleteCatalogoItem('CatTiposRopa', req, res)
};

const equipamientoEPP = {
  getAll: (req, res) => getCatalogo('CatEquipamientoEPP', req, res),
  create: (req, res) => createCatalogoItem('CatEquipamientoEPP', req, res),
  update: (req, res) => updateCatalogoItem('CatEquipamientoEPP', req, res),
  delete: (req, res) => deleteCatalogoItem('CatEquipamientoEPP', req, res)
};

const herramientas = {
  getAll: (req, res) => getCatalogo('CatHerramientas', req, res),
  create: (req, res) => createCatalogoItem('CatHerramientas', req, res),
  update: (req, res) => updateCatalogoItem('CatHerramientas', req, res),
  delete: (req, res) => deleteCatalogoItem('CatHerramientas', req, res)
};

const serviciosVehiculos = {
  getAll: (req, res) => getCatalogo('CatServiciosVehiculos', req, res),
  create: (req, res) => createCatalogoItem('CatServiciosVehiculos', req, res),
  update: (req, res) => updateCatalogoItem('CatServiciosVehiculos', req, res),
  delete: (req, res) => deleteCatalogoItem('CatServiciosVehiculos', req, res)
};

const alimentosBebidas = {
  getAll: (req, res) => getCatalogo('CatAlimentosBebidas', req, res),
  create: (req, res) => createCatalogoItem('CatAlimentosBebidas', req, res),
  update: (req, res) => updateCatalogoItem('CatAlimentosBebidas', req, res),
  delete: (req, res) => deleteCatalogoItem('CatAlimentosBebidas', req, res)
};

const equipoCampo = {
  getAll: (req, res) => getCatalogo('CatEquipoCampo', req, res),
  create: (req, res) => createCatalogoItem('CatEquipoCampo', req, res),
  update: (req, res) => updateCatalogoItem('CatEquipoCampo', req, res),
  delete: (req, res) => deleteCatalogoItem('CatEquipoCampo', req, res)
};

const limpiezaPersonal = {
  getAll: (req, res) => getCatalogo('CatLimpiezaPersonal', req, res),
  create: (req, res) => createCatalogoItem('CatLimpiezaPersonal', req, res),
  update: (req, res) => updateCatalogoItem('CatLimpiezaPersonal', req, res),
  delete: (req, res) => deleteCatalogoItem('CatLimpiezaPersonal', req, res)
};

const limpiezaGeneral = {
  getAll: (req, res) => getCatalogo('CatLimpiezaGeneral', req, res),
  create: (req, res) => createCatalogoItem('CatLimpiezaGeneral', req, res),
  update: (req, res) => updateCatalogoItem('CatLimpiezaGeneral', req, res),
  delete: (req, res) => deleteCatalogoItem('CatLimpiezaGeneral', req, res)
};

const medicamentos = {
  getAll: (req, res) => getCatalogo('CatMedicamentos', req, res),
  create: (req, res) => createCatalogoItem('CatMedicamentos', req, res),
  update: (req, res) => updateCatalogoItem('CatMedicamentos', req, res),
  delete: (req, res) => deleteCatalogoItem('CatMedicamentos', req, res)
};

const alimentosAnimales = {
  getAll: (req, res) => getCatalogo('CatAlimentosAnimales', req, res),
  create: (req, res) => createCatalogoItem('CatAlimentosAnimales', req, res),
  update: (req, res) => updateCatalogoItem('CatAlimentosAnimales', req, res),
  delete: (req, res) => deleteCatalogoItem('CatAlimentosAnimales', req, res)
};

module.exports = {
  tiposRopa,
  equipamientoEPP,
  herramientas,
  serviciosVehiculos,
  alimentosBebidas,
  equipoCampo,
  limpiezaPersonal,
  limpiezaGeneral,
  medicamentos,
  alimentosAnimales
}; 