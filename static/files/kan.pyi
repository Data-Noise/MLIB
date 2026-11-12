"""Type stubs for the compiled `kan` module (KAN — Kolmogorov-Arnold Network)."""

from typing import List, overload

import numpy as np
import numpy.typing as npt

__doc__: str
__version__: str

# Вход/выход всегда одномерный float32 numpy-массив.
FloatVector = npt.NDArray[np.float32]


def generate_dataset() -> List[List[float]]:
    """Возвращает 101 пару (x, cos(5x)) для x ∈ [0, 1].

    Returns:
        Список из 101 элемента вида ``[x, cos(5 * x)]``.
    """
    ...


class Layer:
    """Один слой KAN: набор пар (B-сплайн + SiLU) для каждого входа."""

    input_size: int
    output_size: int
    greed: int

    @overload
    def __init__(self, input_size: int, output_size: int) -> None: ...
    @overload
    def __init__(self, input_size: int, output_size: int, greed: int) -> None: ...
    def __init__(self, input_size: int, output_size: int, greed: int = 4) -> None: ...

    @property
    def parameters(self) -> npt.NDArray[np.float32]:
        """Веса слоя, форма ``(input_size, output_size, greed + 2)``.

        ``[..., 0]`` — веса SiLU, ``[..., 1]`` — веса сплайна,
        ``[..., 2:]`` — контрольные точки B-сплайна.
        """
        ...


class Sequential:
    """Последовательная модель из нескольких ``Layer``."""

    lr: float
    momentum: bool

    def __init__(self, layers: List[Layer]) -> None: ...

    def __call__(self, x: FloatVector) -> FloatVector:
        """Forward pass. Также кэширует ``inputVec`` в каждом слое."""
        ...

    def forward(self, x: FloatVector) -> FloatVector:
        """То же, что ``__call__``, но без магии dunder."""
        ...

    def backpropagation(self, error: FloatVector) -> None:
        """Считает градиенты в ``Layer.error`` для всех слоёв.

        Должно вызываться **после** forward pass, иначе ``inputVec``
        будет содержать значения с прошлого шага.
        """
        ...

    def gradient_descent(self) -> None:
        """Обновляет параметры, используя ``Layer.error`` и ``self.lr``.

        Вызывать **строго** после ``backpropagation``.
        """
        ...

    def save_parameters2json(self, path: str = "array.json") -> None:
        """Сохраняет веса всех слоёв в JSON-файл (по умолчанию ``array.json``)."""
        ...