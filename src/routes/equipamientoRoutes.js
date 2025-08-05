const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validation');
const {
  getEquipamientoRopa,
  createEquipamientoRopa,
  getEquipamientoBotas,
  createEquipamientoBotas,
  getEquipamientoGuantes,
  createEquipamientoGuantes,
  getEquipamientoGenerico,
  createEquipamientoGenerico
} = require('../controllers/equipamientoController');

const router = express.Router();

const equipamientoValidation = [
  body('Cantidad')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad debe ser un número entero positivo'),
  body('Observaciones')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Las observaciones no pueden exceder 500 caracteres')
];

const ropaValidation = [
  body('TipoRopaID')
    .isInt({ min: 1 })
    .withMessage('El tipo de ropa es requerido'),
  body('CantidadXS')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad XS debe ser un número entero positivo'),
  body('CantidadS')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad S debe ser un número entero positivo'),
  body('CantidadM')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad M debe ser un número entero positivo'),
  body('CantidadL')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad L debe ser un número entero positivo'),
  body('CantidadXL')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad XL debe ser un número entero positivo')
];

const botasValidation = [
  body('Talla37')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de talla 37 debe ser un número entero positivo'),
  body('Talla38')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de talla 38 debe ser un número entero positivo'),
  body('Talla39')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de talla 39 debe ser un número entero positivo'),
  body('Talla40')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de talla 40 debe ser un número entero positivo'),
  body('Talla41')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de talla 41 debe ser un número entero positivo'),
  body('Talla42')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de talla 42 debe ser un número entero positivo'),
  body('Talla43')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de talla 43 debe ser un número entero positivo'),
  body('CantidadOtraTalla')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de otra talla debe ser un número entero positivo')
];

const guantesValidation = [
  body('TallaXS')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de talla XS debe ser un número entero positivo'),
  body('TallaS')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de talla S debe ser un número entero positivo'),
  body('TallaM')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de talla M debe ser un número entero positivo'),
  body('TallaL')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de talla L debe ser un número entero positivo'),
  body('TallaXL')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de talla XL debe ser un número entero positivo'),
  body('TallaXXL')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de talla XXL debe ser un número entero positivo'),
  body('CantidadOtraTalla')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad de otra talla debe ser un número entero positivo')
];

router.get('/:brigadaId/ropa', getEquipamientoRopa);
router.post('/:brigadaId/ropa', ropaValidation, validateRequest, createEquipamientoRopa);

router.get('/:brigadaId/botas', getEquipamientoBotas);
router.post('/:brigadaId/botas', botasValidation, validateRequest, createEquipamientoBotas);

router.get('/:brigadaId/guantes', getEquipamientoGuantes);
router.post('/:brigadaId/guantes', guantesValidation, validateRequest, createEquipamientoGuantes);

router.get('/:brigadaId/epp', (req, res) => {
  getEquipamientoGenerico('EquipamientoEPP', req.params.brigadaId, res);
});

router.post('/:brigadaId/epp', [
  body('EquipoEPPID').isInt({ min: 1 }).withMessage('El equipo EPP es requerido'),
  ...equipamientoValidation
], validateRequest, (req, res) => {
  createEquipamientoGenerico('EquipamientoEPP', req.params.brigadaId, req, res);
});

router.get('/:brigadaId/herramientas', (req, res) => {
  getEquipamientoGenerico('Herramientas', req.params.brigadaId, res);
});

router.post('/:brigadaId/herramientas', [
  body('HerramientaID').isInt({ min: 1 }).withMessage('La herramienta es requerida'),
  ...equipamientoValidation
], validateRequest, (req, res) => {
  createEquipamientoGenerico('Herramientas', req.params.brigadaId, req, res);
});

router.get('/:brigadaId/logistica-vehiculos', (req, res) => {
  getEquipamientoGenerico('LogisticaVehiculos', req.params.brigadaId, res);
});

router.post('/:brigadaId/logistica-vehiculos', [
  body('ServicioVehiculoID').isInt({ min: 1 }).withMessage('El servicio de vehículo es requerido'),
  body('MontoAproximado').optional().isFloat({ min: 0 }).withMessage('El monto debe ser un número positivo'),
  body('Observaciones').optional().isLength({ max: 500 }).withMessage('Las observaciones no pueden exceder 500 caracteres')
], validateRequest, (req, res) => {
  createEquipamientoGenerico('LogisticaVehiculos', req.params.brigadaId, req, res);
});

router.get('/:brigadaId/alimentacion', (req, res) => {
  getEquipamientoGenerico('AlimentacionBebidas', req.params.brigadaId, res);
});

router.post('/:brigadaId/alimentacion', [
  body('AlimentoBebidaID').isInt({ min: 1 }).withMessage('El alimento o bebida es requerido'),
  ...equipamientoValidation
], validateRequest, (req, res) => {
  createEquipamientoGenerico('AlimentacionBebidas', req.params.brigadaId, req, res);
});

router.get('/:brigadaId/equipo-campo', (req, res) => {
  getEquipamientoGenerico('EquipoCampo', req.params.brigadaId, res);
});

router.post('/:brigadaId/equipo-campo', [
  body('EquipoCampoID').isInt({ min: 1 }).withMessage('El equipo de campo es requerido'),
  ...equipamientoValidation
], validateRequest, (req, res) => {
  createEquipamientoGenerico('EquipoCampo', req.params.brigadaId, req, res);
});

router.get('/:brigadaId/limpieza-personal', (req, res) => {
  getEquipamientoGenerico('LimpiezaPersonal', req.params.brigadaId, res);
});

router.post('/:brigadaId/limpieza-personal', [
  body('ProductoLimpiezaPersonalID').isInt({ min: 1 }).withMessage('El producto de limpieza personal es requerido'),
  ...equipamientoValidation
], validateRequest, (req, res) => {
  createEquipamientoGenerico('LimpiezaPersonal', req.params.brigadaId, req, res);
});

router.get('/:brigadaId/limpieza-general', (req, res) => {
  getEquipamientoGenerico('LimpiezaGeneral', req.params.brigadaId, res);
});

router.post('/:brigadaId/limpieza-general', [
  body('ProductoLimpiezaGeneralID').isInt({ min: 1 }).withMessage('El producto de limpieza general es requerido'),
  ...equipamientoValidation
], validateRequest, (req, res) => {
  createEquipamientoGenerico('LimpiezaGeneral', req.params.brigadaId, req, res);
});

router.get('/:brigadaId/medicamentos', (req, res) => {
  getEquipamientoGenerico('Medicamentos', req.params.brigadaId, res);
});

router.post('/:brigadaId/medicamentos', [
  body('MedicamentoID').isInt({ min: 1 }).withMessage('El medicamento es requerido'),
  ...equipamientoValidation
], validateRequest, (req, res) => {
  createEquipamientoGenerico('Medicamentos', req.params.brigadaId, req, res);
});

router.get('/:brigadaId/rescate-animal', (req, res) => {
  getEquipamientoGenerico('RescateAnimal', req.params.brigadaId, res);
});

router.post('/:brigadaId/rescate-animal', [
  body('AlimentoAnimalID').isInt({ min: 1 }).withMessage('El alimento para animales es requerido'),
  ...equipamientoValidation
], validateRequest, (req, res) => {
  createEquipamientoGenerico('RescateAnimal', req.params.brigadaId, req, res);
});

module.exports = router; 