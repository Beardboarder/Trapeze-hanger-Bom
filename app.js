const RODS_PER_HANGER = 2;

const itemCatalog = [
  {
    key: "nuts",
    item: "Hex nut",
    size: "1/2\"",
    unit: "each",
    defaultPackageSize: 100
  },
  {
    key: "squareWashers",
    item: "Square washer",
    size: "1/2\"",
    unit: "each",
    defaultPackageSize: 100
  },
  {
    key: "lockWashers",
    item: "Lock washer",
    size: "1/2\"",
    unit: "each",
    defaultPackageSize: 100
  },
  {
    key: "windowClamps",
    item: "Window clamp",
    size: "Appropriately sized",
    unit: "each",
    defaultPackageSize: 1
  },
  {
    key: "beamClamps",
    item: "Eaton B-Line beam clamp",
    size: "B750-J12",
    unit: "each",
    defaultPackageSize: 1
  }
];

const presets = [
  {
    name: "Single trapeze - top spanner strut",
    tiers: 1,
    topStyle: "spanner"
  },
  {
    name: "2-tier trapeze - top spanner strut",
    tiers: 2,
    topStyle: "spanner"
  },
  {
    name: "3-tier trapeze - top spanner strut",
    tiers: 3,
    topStyle: "spanner"
  },
  {
    name: "Single trapeze - B750-J12 beam clamps",
    tiers: 1,
    topStyle: "beamClamp"
  },
  {
    name: "2-tier trapeze - B750-J12 beam clamps",
    tiers: 2,
    topStyle: "beamClamp"
  },
  {
    name: "3-tier trapeze - B750-J12 beam clamps",
    tiers: 3,
    topStyle: "beamClamp"
  },
  {
    name: "Custom",
    tiers: 1,
    topStyle: "spanner"
  }
];

const els = {
  hangerLinesBody: document.getElementById("hangerLinesBody"),
  addLineBtn: document.getElementById("addLineBtn"),
  loadExampleBtn: document.getElementById("loadExampleBtn"),
  wasteFactor: document.getElementById("wasteFactor"),
  roundingMode: document.getElementById("roundingMode"),
  packageSizes: document.getElementById("packageSizes"),
  calculateBtn: document.getElementById("calculateBtn"),
  resetBtn: document.getElementById("resetBtn"),
  exportCsvBtn: document.getElementById("exportCsvBtn"),
  bomBody: document.getElementById("bomBody"),
  calcSummary: document.getElementById("calcSummary"),
  lineBreakdown: document.getElementById("lineBreakdown")
};

let hangerLines = [];
let lastBom = [];
let lastLineResults = [];

function init() {
  loadPackageSizeInputs();
  resetLines();
  calculateAndRender();

  els.addLineBtn.addEventListener("click", () => {
    addHangerLine({
      presetIndex: 0,
      quantity: 1,
      tiers: 1,
      topStyle: "spanner"
    });
    calculateAndRender();
  });

  els.loadExampleBtn.addEventListener("click", () => {
    hangerLines = [];
    addHangerLine({ presetIndex: 0, quantity: 10, tiers: 1, topStyle: "spanner" });
    addHangerLine({ presetIndex: 4, quantity: 6, tiers: 2, topStyle: "beamClamp" });
    calculateAndRender();
  });

  els.calculateBtn.addEventListener("click", calculateAndRender);

  els.resetBtn.addEventListener("click", () => {
    resetLines();
    els.wasteFactor.value = 0;
    els.roundingMode.value = "package";
    calculateAndRender();
  });

  els.exportCsvBtn.addEventListener("click", exportCsv);

  [els.wasteFactor, els.roundingMode].forEach((el) => {
    el.addEventListener("input", calculateAndRender);
    el.addEventListener("change", calculateAndRender);
  });
}

function resetLines() {
  hangerLines = [];
  addHangerLine({ presetIndex: 0, quantity: 1, tiers: 1, topStyle: "spanner" });
  addHangerLine({ presetIndex: 3, quantity: 0, tiers: 1, topStyle: "beamClamp" });
}

function loadPackageSizeInputs() {
  els.packageSizes.innerHTML = itemCatalog
    .map(
      (item) => `
        <div>
          <label for="pkg-${item.key}">${item.item}</label>
          <input id="pkg-${item.key}" type="number" min="1" step="1" value="${item.defaultPackageSize}" />
        </div>
      `
    )
    .join("");

  itemCatalog.forEach((item) => {
    document.getElementById(`pkg-${item.key}`).addEventListener("input", calculateAndRender);
  });
}

function addHangerLine({ presetIndex = 0, quantity = 1, tiers = 1, topStyle = "spanner" } = {}) {
  const line = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    presetIndex,
    quantity,
    tiers,
    topStyle
  };

  hangerLines.push(line);
  renderHangerLines();
}

function renderHangerLines() {
  els.hangerLinesBody.innerHTML = hangerLines
    .map((line) => {
      const presetOptions = presets
        .map(
          (preset, index) =>
            `<option value="${index}" ${index === Number(line.presetIndex) ? "selected" : ""}>${preset.name}</option>`
        )
        .join("");

      return `
        <tr data-line-id="${line.id}">
          <td>
            <select class="line-preset">
              ${presetOptions}
            </select>
          </td>
          <td>
            <input class="line-qty" type="number" min="0" step="1" value="${line.quantity}" />
          </td>
          <td>
            <input class="line-tiers" type="number" min="1" step="1" value="${line.tiers}" />
          </td>
          <td>
            <select class="line-top-style">
              <option value="spanner" ${line.topStyle === "spanner" ? "selected" : ""}>Top spanner / span strut</option>
              <option value="beamClamp" ${line.topStyle === "beamClamp" ? "selected" : ""}>Eaton B-Line B750-J12 beam clamp</option>
            </select>
          </td>
          <td>
            <button type="button" class="remove-line-btn" aria-label="Remove line">Remove</button>
          </td>
        </tr>
      `;
    })
    .join("");

  wireLineEvents();
}

function wireLineEvents() {
  els.hangerLinesBody.querySelectorAll("tr").forEach((row) => {
    const id = row.dataset.lineId;
    const line = hangerLines.find((item) => item.id === id);
    if (!line) return;

    const presetEl = row.querySelector(".line-preset");
    const qtyEl = row.querySelector(".line-qty");
    const tiersEl = row.querySelector(".line-tiers");
    const topStyleEl = row.querySelector(".line-top-style");
    const removeBtn = row.querySelector(".remove-line-btn");

    presetEl.addEventListener("change", () => {
      const presetIndex = Number(presetEl.value);
      const preset = presets[presetIndex];

      line.presetIndex = presetIndex;

      if (preset.name !== "Custom") {
        line.tiers = preset.tiers;
        line.topStyle = preset.topStyle;
      }

      renderHangerLines();
      calculateAndRender();
    });

    qtyEl.addEventListener("input", () => {
      line.quantity = Math.max(0, Math.ceil(getInputNumber(qtyEl, 0)));
      calculateAndRender();
    });

    tiersEl.addEventListener("input", () => {
      line.tiers = Math.max(1, Math.ceil(getInputNumber(tiersEl, 1)));
      line.presetIndex = presets.length - 1;
      calculateAndRender();
    });

    topStyleEl.addEventListener("change", () => {
      line.topStyle = topStyleEl.value;
      line.presetIndex = presets.length - 1;
      calculateAndRender();
    });

    removeBtn.addEventListener("click", () => {
      hangerLines = hangerLines.filter((item) => item.id !== id);
      if (hangerLines.length === 0) {
        addHangerLine({ presetIndex: 0, quantity: 1, tiers: 1, topStyle: "spanner" });
      } else {
        renderHangerLines();
      }
      calculateAndRender();
    });
  });
}

function getInputNumber(input, fallback = 0) {
  const value = Number(input.value);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function getPackageSize(itemKey) {
  const input = document.getElementById(`pkg-${itemKey}`);
  const value = Number(input.value);
  return Number.isFinite(value) && value > 0 ? Math.ceil(value) : 1;
}

function calculatePerHanger(tiers, topStyle) {
  const counts = {
    nuts: 0,
    squareWashers: 0,
    lockWashers: 0,
    windowClamps: 0,
    beamClamps: 0
  };

  // Each cable tray tier connection, including middle tiers and the bottom hanger,
  // uses this hardware per rod:
  // 2 nuts, 2 square washers, 1 lock washer.
  counts.nuts += tiers * RODS_PER_HANGER * 2;
  counts.squareWashers += tiers * RODS_PER_HANGER * 2;
  counts.lockWashers += tiers * RODS_PER_HANGER * 1;

  if (topStyle === "spanner") {
    // Top spanner hardware per rod:
    // 2 nuts, 2 square washers, 1 lock washer.
    counts.nuts += RODS_PER_HANGER * 2;
    counts.squareWashers += RODS_PER_HANGER * 2;
    counts.lockWashers += RODS_PER_HANGER * 1;
    counts.windowClamps += 2;
  }

  if (topStyle === "beamClamp") {
    // B750-J12 beam clamp style:
    // 1 beam clamp per rod, plus 2 nuts and 2 lock washers per clamp.
    counts.beamClamps += RODS_PER_HANGER;
    counts.nuts += RODS_PER_HANGER * 2;
    counts.lockWashers += RODS_PER_HANGER * 2;
  }

  return counts;
}

function addCounts(target, source, multiplier = 1) {
  Object.keys(target).forEach((key) => {
    target[key] += (source[key] || 0) * multiplier;
  });
}

function buildBom() {
  const wasteFactor = getInputNumber(els.wasteFactor, 0) / 100;
  const roundingMode = els.roundingMode.value;

  const totalCounts = {
    nuts: 0,
    squareWashers: 0,
    lockWashers: 0,
    windowClamps: 0,
    beamClamps: 0
  };

  const lineResults = hangerLines.map((line, index) => {
    const quantity = Math.max(0, Math.ceil(Number(line.quantity) || 0));
    const tiers = Math.max(1, Math.ceil(Number(line.tiers) || 1));
    const topStyle = line.topStyle;
    const perHanger = calculatePerHanger(tiers, topStyle);

    addCounts(totalCounts, perHanger, quantity);

    return {
      lineNumber: index + 1,
      quantity,
      tiers,
      topStyle,
      perHanger,
      total: Object.fromEntries(
        Object.entries(perHanger).map(([key, value]) => [key, value * quantity])
      )
    };
  });

  const bom = itemCatalog.map((catalogItem) => {
    const rawBeforeWaste = totalCounts[catalogItem.key] || 0;
    const rawQty = rawBeforeWaste * (1 + wasteFactor);
    const packageSize = getPackageSize(catalogItem.key);
    const orderQty =
      roundingMode === "package"
        ? Math.ceil(rawQty / packageSize) * packageSize
        : Math.ceil(rawQty);

    return {
      ...catalogItem,
      rawQty,
      orderQty,
      packageSize
    };
  });

  return {
    wasteFactor,
    roundingMode,
    totalCounts,
    lineResults,
    bom
  };
}

function calculateAndRender() {
  const result = buildBom();
  lastBom = result.bom;
  lastLineResults = result.lineResults;

  const totalHangers = result.lineResults.reduce((sum, line) => sum + line.quantity, 0);
  const activeLines = result.lineResults.filter((line) => line.quantity > 0).length;

  els.calcSummary.textContent = `${totalHangers} total hanger(s) across ${activeLines} active line(s), ${(result.wasteFactor * 100).toFixed(1)}% waste/spare factor.`;

  els.bomBody.innerHTML = result.bom
    .map(
      (row) => `
        <tr>
          <td>${row.item}</td>
          <td>${row.size}</td>
          <td>${formatQty(row.rawQty)}</td>
          <td><strong>${formatQty(row.orderQty)}</strong></td>
          <td>${row.unit}</td>
          <td>${row.packageSize}</td>
        </tr>
      `
    )
    .join("");

  els.lineBreakdown.innerHTML = `
    <strong>Line breakdown before waste:</strong>
    <ul>
      ${result.lineResults
        .map((line) => {
          const styleLabel =
            line.topStyle === "spanner"
              ? "top spanner / span strut"
              : "Eaton B-Line B750-J12 beam clamp";

          return `
            <li>
              Line ${line.lineNumber}: ${line.quantity} hanger(s), ${line.tiers} tier(s), ${styleLabel}.
              Totals: ${line.total.nuts} nut(s), ${line.total.squareWashers} square washer(s),
              ${line.total.lockWashers} lock washer(s), ${line.total.windowClamps} window clamp(s),
              ${line.total.beamClamps} B750-J12 beam clamp(s).
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
}

function formatQty(value) {
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(2).replace(/\.00$/, "");
}

function exportCsv() {
  if (!lastBom.length) {
    calculateAndRender();
  }

  const bomHeader = ["Item", "Size / Part", "Raw Qty", "Order Qty", "Unit", "Package Size"];
  const bomRows = lastBom.map((row) => [
    row.item,
    row.size,
    formatQty(row.rawQty),
    formatQty(row.orderQty),
    row.unit,
    row.packageSize
  ]);

  const lineHeader = [
    "Line",
    "Quantity",
    "Tiers",
    "Top Support Style",
    "Nuts",
    "Square Washers",
    "Lock Washers",
    "Window Clamps",
    "B750-J12 Beam Clamps"
  ];

  const lineRows = lastLineResults.map((line) => [
    line.lineNumber,
    line.quantity,
    line.tiers,
    line.topStyle === "spanner" ? "Top spanner / span strut" : "Eaton B-Line B750-J12 beam clamp",
    line.total.nuts,
    line.total.squareWashers,
    line.total.lockWashers,
    line.total.windowClamps,
    line.total.beamClamps
  ]);

  const csvRows = [
    ["Bill of Material"],
    bomHeader,
    ...bomRows,
    [],
    ["Line Breakdown"],
    lineHeader,
    ...lineRows
  ];

  const csv = csvRows
    .map((row) =>
      row
        .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "trapeze-hanger-bom.csv";
  link.click();
  URL.revokeObjectURL(url);
}

init();
